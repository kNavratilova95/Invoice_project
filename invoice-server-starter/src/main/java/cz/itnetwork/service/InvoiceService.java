package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;

import java.util.List;

public interface InvoiceService {
    /**
     * Create a new invoice
     *
     * @param invoiceDTO invoice dto from invoice mapper
     * @return InvoiceDTO with new invoice
     */
    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    /**
     * Method for obtaining sales and purchases invoices
     *
     * @param identificationNumber identification number from person
     * @param isSale               is true if the invoice is a sale
     * @return list of InvoiceDTO with sales and purchases invoices
     */
    List<InvoiceDTO> getSalesAndPurchasesInvoices(String identificationNumber, boolean isSale);

    /**
     * Method for obtaining all invoices
     *
     * @param invoiceFilter invoice filter from invoice specification
     * @return list of InvoiceDTO with all invoices
     */
    List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter);

    /**
     * Method for obtaining invoice by invoice id
     *
     * @param id id of invoice
     * @return invoiceDTO with one invoice
     */
    InvoiceDTO getInvoiceById(Long id);

    /**
     * Method for editing invoice
     *
     * @param invoiceDTO invoiceDTO with all information about the invoice
     * @param id         id of invoice to editing
     * @return DTO with edited invoice
     */
    InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, long id);

    /**
     * Method for deleting invoice
     *
     * @param id id of invoice
     */
    void removeInvoice(long id);

    /**
     * Method for getting invoice statistics
     *
     * @return list of invoiceStatisticsDTO with statistics
     */
    List<InvoiceStatisticsDTO> getInvoicesStatistics();
}