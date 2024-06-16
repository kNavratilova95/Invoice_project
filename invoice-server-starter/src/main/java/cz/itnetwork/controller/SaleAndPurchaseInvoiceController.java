package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Rest Controller for working with statistics, we will call the invoice service instance here.
 */
@RestController
@RequestMapping("/api/identification/{identificationNumber}/")
public class SaleAndPurchaseInvoiceController {
    @Autowired
    private InvoiceService invoiceService; //instance of InvoiceService

    @GetMapping("sales")
    public List<InvoiceDTO> geSalesInvoices(@PathVariable String identificationNumber) {
        return invoiceService.getSalesAndPurchasesInvoices(identificationNumber, true);
    }

    @GetMapping("purchases")
    public List<InvoiceDTO> getPurchasesInvoices(@PathVariable String identificationNumber) {
        return invoiceService.getSalesAndPurchasesInvoices(identificationNumber, false);
    }
}