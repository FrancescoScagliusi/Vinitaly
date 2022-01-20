package it.unito.vinitaly.controller;


import it.unito.vinitaly.model.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


/*
Controller REST per le varie query effettuabili sulle occasioni in cui bere un vino
*/

@RestController
@RequestMapping(value = "/occasione")
public class OccasioneController {


    //Funzione che ritorna tutte le occasioni presenti nell'ontologia
    @GetMapping("")
    public ResponseEntity<?> findAll(){

        String strQuery  = "select ?uri ?label where { ?uri a :Occasione . ?uri rdfs:label ?label .}";

        return new ResponseEntity(Query.executeQueryWithLabel(strQuery), HttpStatus.OK);
    }

}
