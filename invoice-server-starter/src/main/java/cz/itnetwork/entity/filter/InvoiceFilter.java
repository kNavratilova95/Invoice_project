package cz.itnetwork.entity.filter;

import lombok.Data;

/**
 * DTO class for filtering invoices
 */
@Data
public class InvoiceFilter {
    private Integer buyerID;

    private Integer sellerID;

    private String product;

    private Long minPrice;

    private Long maxPrice;

    private Integer limit = Integer.MAX_VALUE;
}