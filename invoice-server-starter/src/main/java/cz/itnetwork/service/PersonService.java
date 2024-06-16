package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;

import java.util.List;

public interface PersonService {
    /**
     * Creates a new person
     *
     * @param personDTO Person to create
     * @return newly created person
     */
    PersonDTO addPerson(PersonDTO personDTO);

    /**
     * Sets hidden flag to true for the person with the matching [id]
     * In case a person with the passed [id] isn't found, the method silently fails
     *
     * @param id Person to delete
     */
    void removePerson(long id);

    /**
     * Fetches all non-hidden persons
     *
     * @return List of all non-hidden persons
     */
    List<PersonDTO> getAllPersons();

    /**
     * fetch one person fetched by their id
     *
     * @param id of the person to fetch
     * @return PersonDTO with the fetched person
     */
    PersonDTO getPersonById(long id);

    /**
     * fetch one person by id with person's information
     *
     * @param personDTO person dto with all information about this person
     * @param id        id of the person to fetch
     * @return PersonDTO with the edited person
     */
    PersonDTO editPerson(PersonDTO personDTO, Long id);

    /**
     * method for obtaining persons statistics
     *
     * @return list of persons statistics
     */
    List<PersonStatisticsDTO> getPersonsStatistics();
}