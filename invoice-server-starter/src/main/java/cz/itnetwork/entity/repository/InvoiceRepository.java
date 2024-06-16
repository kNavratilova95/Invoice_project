package cz.itnetwork.entity.repository;

import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Repository with a query for searching InvoiceStatisticsDTO to obtain invoice statistics
 */

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long>, JpaSpecificationExecutor<InvoiceEntity> {
    @Query("""
             SELECT new cz.itnetwork.dto.InvoiceStatisticsDTO(
                 SUM(COALESCE(i.price, 0)),
                 COUNT(i),
                 SUM(CASE WHEN YEAR(i.issued) = YEAR(CURRENT_DATE) THEN COALESCE(i.price, 0) ELSE 0 END)
             )
             FROM invoice i
            """)
    List<InvoiceStatisticsDTO> getInvoicesStatistics();
}