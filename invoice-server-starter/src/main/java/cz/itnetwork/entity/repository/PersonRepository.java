/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */
package cz.itnetwork.entity.repository;

import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.dto.PersonStatisticsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<PersonEntity, Long>, PagingAndSortingRepository<PersonEntity, Long> {
    /**
     * method for getting people according to the hidden parameter
     *
     * @param hidden hidden status of person
     * @return List of PersonEntity objects
     */
    List<PersonEntity> findByHidden(boolean hidden);

    /**
     * Method to get List of PersonStatisticsDTO  to get person statistics
     *
     * @return List of PersonStatisticsDTO
     */
    @Query("""
            SELECT new cz.itnetwork.dto.PersonStatisticsDTO(p.id,p.name,SUM(IFNULL(i.price,0)))
            FROM person AS p
            LEFT JOIN invoice AS i ON p.id = i.seller.id
            GROUP BY p.id
            HAVING SUM(COALESCE(i.price, 0)) > 0
            """)
    List<PersonStatisticsDTO> getPersonStatistics();
}