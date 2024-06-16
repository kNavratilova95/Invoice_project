package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.specification.InvoiceSpecification;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * service class for invoices with all operations
 */
@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private InvoiceMapper invoiceMapper;
    @Autowired
    private PersonService personService;

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        // Retrieve seller and buyer details
        PersonDTO seller = personService.getPersonById(invoiceDTO.getSeller().getId());
        PersonDTO buyer = personService.getPersonById(invoiceDTO.getBuyer().getId());

        // Set seller and buyer in the invoice DTO
        invoiceDTO.setSeller(seller);
        invoiceDTO.setBuyer(buyer);

        // Convert DTO to entity
        InvoiceEntity invoiceEntity = invoiceMapper.toEntity(invoiceDTO);

        // Save the entity and flush changes
        InvoiceEntity newInvoice = invoiceRepository.saveAndFlush(invoiceEntity);

        // Convert entity back to DTO and return
        return invoiceMapper.toDTO(newInvoice);
    }

    @Override
    public List<InvoiceDTO> getSalesAndPurchasesInvoices(String identificationNumber, boolean isSale) {
        // Retrieve all invoices
        InvoiceFilter filter = new InvoiceFilter();
        List<InvoiceDTO> allInvoices = getAllInvoices(filter);
        Predicate<InvoiceDTO> filterPredicate = isSale ?  // is a sale if the seller contains this identification number. Otherwise it's a buyer.
                invoice -> invoice.getSeller().getIdentificationNumber().equals(identificationNumber) : invoice -> invoice.getBuyer().getIdentificationNumber().equals(identificationNumber);
        return allInvoices.stream().filter(filterPredicate).collect(Collectors.toList());
    }

    @Override
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter) {
        // Create invoice specification based on the filter
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);

        // Retrieve all invoices that match the specification, convert them to DTOs and return
        return invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0, invoiceFilter.getLimit())).stream().map(invoiceMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public InvoiceDTO getInvoiceById(Long id) {
        // Retrieve invoice by ID
        InvoiceEntity invoice = invoiceRepository.getReferenceById(id);

        // Convert entity to DTO and return
        return invoiceMapper.toDTO(invoice);
    }

    @Override
    public InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, long id) {
        // Check if the invoice exists
        if (!invoiceRepository.existsById(id)) {
            throw new EntityNotFoundException("Faktura s tímto id " + id + " nebyla nalezena.");
        }

        // Convert DTO to entity and set the ID
        InvoiceEntity fetchedEntity = invoiceMapper.toEntity(invoiceDTO);
        fetchedEntity.setId(id);

        // Save the updated entity and convert it back to DTO
        InvoiceEntity updatedEntity = invoiceRepository.save(fetchedEntity);
        return invoiceMapper.toDTO(updatedEntity);
    }

    @Override
    public void removeInvoice(long id) {
        // Check if the invoice exists
        InvoiceEntity invoice = invoiceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        invoiceRepository.delete(invoice);
    }

    @Override
    public List<InvoiceStatisticsDTO> getInvoicesStatistics() {
        return invoiceRepository.getInvoicesStatistics();
    }
}