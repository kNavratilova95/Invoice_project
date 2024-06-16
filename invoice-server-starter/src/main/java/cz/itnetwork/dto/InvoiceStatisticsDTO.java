package cz.itnetwork.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

/**
 * DTO for invoice statistics
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceStatisticsDTO {
    @JsonProperty("allTimeSum")
    private Long price;

    private Long invoicesCount;

    private Long currentYearSum;
}