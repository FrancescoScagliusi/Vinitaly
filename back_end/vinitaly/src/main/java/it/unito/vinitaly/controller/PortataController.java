package it.unito.vinitaly.controller;


import it.unito.vinitaly.model.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/*
Controller REST per le varie query effettuabili sulle portate
*/

@RestController
@RequestMapping(value = "/portata")
public class PortataController {


    //Funzione che ritorna tutte le portate presenti nell'ontologia
    @GetMapping("")
    public ResponseEntity<?>findAll(){

        String strQuery  = "select ?label ?uri where { ?uri a :Portata . ?uri rdfs:label ?label .}";


        return new ResponseEntity(Query.executeQueryWithLabel(strQuery), HttpStatus.OK);
    }


    //Funzione che ritorna tutti i tipi di portatata presenti nell'ontologia
    @GetMapping("/tipi")
    public ResponseEntity<?> findTipi(){

        String strQuery  = "select ?uri ?label where { ?uri a :TipoPortata .?uri rdfs:label ?label .}";


        return new ResponseEntity(Query.executeQueryWithLabel(strQuery), HttpStatus.OK);
    }


    //Funzione che ritorna tutte le portate di un tipo dato in input
    @GetMapping("/{tipo}")
    public ResponseEntity<?> findPortataByTipo( @PathVariable String tipo){



        String strQuery  =
                        "select ?n where {  " +
                        "?p :tipoPortata  :" + tipo + "." +
                        "?p rdfs:label ?n .}";

        return new ResponseEntity(Query.executeQuery(strQuery), HttpStatus.OK);
    }

}
