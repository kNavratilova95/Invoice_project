package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Rest Controller for working with invoices, we will call the invoice service instance here.
 */
@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService; //instance of InvoiceService

    @PostMapping("")
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.addInvoice(invoiceDTO);
    }

    @GetMapping("")
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter) {
        return invoiceService.getAllInvoices(invoiceFilter);
    }

    @GetMapping("/{id}")
    public InvoiceDTO getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id);
    }

    @PutMapping("/{id}")
    public InvoiceDTO editInvoice(@PathVariable long id, @RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.editInvoice(invoiceDTO, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)   //return status code 204 if delete was successful
    public void removeInvoice(@PathVariable Long id) {
        invoiceService.removeInvoice(id);
    }

    @GetMapping("/statistics")
    public List<InvoiceStatisticsDTO> getInvoicesStatistics() {
        return invoiceService.getInvoicesStatistics();
    }
}