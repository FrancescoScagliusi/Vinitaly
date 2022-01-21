package it.unito.vinitaly.controller;


import it.unito.vinitaly.model.Entity;
import it.unito.vinitaly.model.Query;
import it.unito.vinitaly.model.Vino;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.update.UpdateExecutionFactory;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateProcessor;
import org.apache.jena.update.UpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


/*
Controller REST per le varie query effettuabili sui vini
*/

@RestController
@RequestMapping(value = "/vini")
public class ViniController {



    private static final String REPO_INSERT = "http://localhost:7200/repositories/Vinitaly/statements"; //costante contenente l'URL per accedere al repository su GraphDB per effettuare query sparql di INSERT






    //Funzione che ritorna la lista delle sottoclassi di ColoreVino
    @GetMapping("/colori")
    public ResponseEntity<?> getColori(){
        String query = "select distinct ?label ?uri where { ?uri rdfs:subClassOf :ColoreVino . ?uri rdfs:label ?label} limit 3";

        return new ResponseEntity(Query.executeQueryWithLabel(query), HttpStatus.OK);
    }

    //Funzione che ritorna la lista delle sottoclassi di StrutturaVino
    @GetMapping("/strutture")
    public ResponseEntity<?> getStrutture(){
        String query = "select distinct ?label ?uri where { ?uri sesame:directSubClassOf :StrutturaVino . ?uri rdfs:label ?label}";

        return new ResponseEntity(Query.executeQueryWithLabel(query), HttpStatus.OK);
    }


    //Funzione che ritorna la lista di tutti i Vini con un Denominazione presenti nell'ontologia
    @GetMapping("/all")
    public ResponseEntity<?> getAllWine(){

        String strQuery  = "SELECT distinct ?uri ?label WHERE{?uri a :Vino . ?uri :denominazione ?label .}";

        return new ResponseEntity(Query.executeQueryWithLabel(strQuery), HttpStatus.OK);
    }


    //Funzione che dato un URI di un vino, ritorna tutti i suoi dettagli (dataprop e objectprop)
    @GetMapping("/details")
    public ResponseEntity<?> findWine(@RequestParam String vino){

        String queryAromi  =
                "SELECT distinct ?n WHERE {" +
                "<" + vino + "> :haAroma ?a. " +
                "?a rdfs:label ?n. }";


        String queryVitigni  =
                "SELECT distinct ?n WHERE {" +
                "<" + vino + "> :prodottoDa ?a. " +
                "?a rdfs:label ?n. }";


        String [] vitigni =  Query.executeQuery(queryVitigni).toArray(new String[0]);
        String [] aromi =  Query.executeQuery(queryAromi).toArray(new String[0]);


        System.out.println(vitigni);
        System.out.println(aromi);


        String strQuery  = Query.PREFIX +
                "select ?nome ?origine ?grado ?pressione ?annata ?prezzo ?dosaggio ?cantina " +
                "where { " +
                "<"+vino+ "> :denominazione ?nome . " +
                "<"+vino+ "> :pressione ?pressione . " +
                "<"+vino+ "> :gradoAlcolico ?grado . " +
                "<"+vino+ "> :prezzo ?prezzo . " +
                "<"+vino+ "> :annata ?annata . " +
                "<"+vino+ "> m:isMemberOf ?c . " +
                "?c rdfs:label ?cantina . " +
                "<"+vino+ "> :haDosaggio ?d . " +
                "?d rdfs:label ?dosaggio . " +
                "<"+vino+ "> :vinoOriginatoIn ?o . " +
                "?o rdfs:label ?origine . }";


        System.out.println(strQuery);
        QueryExecution queryExecution = QueryExecutionFactory.sparqlService(Query.REPO_QUERY, strQuery);

        ResultSet results = queryExecution.execSelect();

        QuerySolution qs = results.next();

        String nome = Query.formatString(qs.get("?nome").toString());
        String origine = Query.formatString(qs.get("?origine").toString());
        String grado = Query.formatString(qs.get("?grado").toString());
        String pressione = Query.formatString(qs.get("?pressione").toString());
        String annata = Query.formatString(qs.get("?annata").toString());
        String prezzo = Query.formatString(qs.get("?prezzo").toString());
        String dosaggio = Query.formatString(qs.get("?dosaggio").toString());
        String cantina = Query.formatString(qs.get("?cantina").toString());

        queryExecution.close();

        Vino v = new Vino(nome,aromi,origine,grado,pressione,annata,prezzo,dosaggio,cantina,vitigni,"","");


        return new ResponseEntity(v, HttpStatus.OK);
    }


    //Funzione che data una struttura di un vino e un colore, ritorna la lista dei vini con struttura e colore in input
    @GetMapping("/vino")
    public ResponseEntity<?> findWine(@RequestParam String struttura, @RequestParam String colore){

        System.out.println(struttura);
        System.out.println(colore);

        String struttura_param =  "?uri a <" + struttura + "> .";
        String colore_param = "?uri a <" + colore +    "> .";

        String query =
                " SELECT ?uri ?label " +
                "WHERE " +
                "{ " +
                "?uri :denominazione ?label . ";

        if(!struttura.trim().isEmpty())  query += struttura_param;
        if(!colore.trim().isEmpty())  query += colore_param;

        query +=  "}";

        System.out.println(query);

        return new ResponseEntity(Query.executeQueryWithLabel(query), HttpStatus.OK);
    }


    //Funzione che data una portata, ritorna la lista dei vini abbinati ad essa
    @GetMapping("/vino_abbinamento")
    public ResponseEntity<?> findWineByPortata(@RequestParam String portata){
        String query =
                "SELECT DISTINCT ?uri ?label " +
                "WHERE " +
                "{ " +
                " <" + portata + "> :tipoPortata ?tipo . " +
                " ?tipo :éConsigliato ?s . " +
                " ?s a ?colore. " +
                " ?s a ?struttura. " +
                " ?colore sesame:directSubClassOf :ColoreVino . " +
                " ?struttura sesame:directSubClassOf :StrutturaVino . " +
                " ?colore rdfs:label ?l1 ." +
                " ?struttura rdfs:label ?l2 ." +
                " ?uri a ?colore . " +
                " ?uri a ?struttura . " +
                " ?uri :denominazione ?label " +
                "} ";


        System.out.println(query);

        return new ResponseEntity(Query.executeQueryWithLabel(query), HttpStatus.OK);
    }


    //Funzione che data una regione, un tipo portata e un occasione, ritorna la lista di vini originati nella regione in input, abbinata al tipo portata in input e bevibili nell'occasione in input
    @GetMapping("/vino_occasione")
    public ResponseEntity<?> findWineByOccasione(@RequestParam String regione, @RequestParam String tipoPortata,@RequestParam String occasione){
        String query =
                "SELECT DISTINCT ?uri ?label " +
                "WHERE " +
                "{ " +
                " <" + tipoPortata + "> :éConsigliato ?s . " +
                " ?s a ?colore. " +
                " ?s a ?struttura. " +
                " ?colore sesame:directSubClassOf :ColoreVino . " +
                " ?struttura sesame:directSubClassOf :StrutturaVino . " +
                " ?colore rdfs:label ?l1 ." +
                " ?struttura rdfs:label ?l2 ." +
                " ?uri a ?colore . " +
                " ?uri a ?struttura . ";



        String momento = "?uri :momentoPerDegustarlo <" + occasione + "> . ";

        String origine = "?uri :vinoOriginatoIn <" + regione + "> . ";

        String denominazione = "?uri :denominazione ?label } ";

        if (!occasione.trim().isEmpty()) query += momento;
        if (!regione.trim().isEmpty()) query += origine;

        query+=denominazione;

        System.out.println(query);

        return new ResponseEntity(Query.executeQueryWithLabel(query), HttpStatus.OK);
    }



    //Funzione che dato un vino, ritorna la lista dei vini somiglianti ad esso
    @GetMapping("/somiglia")
    public ResponseEntity<?> findWineSomiglia(@RequestParam String vino){
        String query =
                "SELECT DISTINCT ?uri ?label " +
                "WHERE " +
                "{ " +
                " <" + vino + "> :somiglia ?uri . " +
                " ?uri :denominazione ?label . " +
                "}";


        System.out.println(query);

        return new ResponseEntity(Query.executeQueryWithLabel(query), HttpStatus.OK);

    }

    //Funzione che data una cantina, ritorna la lista dei vini appartenenti ad essa
    @GetMapping("/cantina")
    public ResponseEntity<?> findWineByCantina(@RequestParam String cantina){

        String query =
                "SELECT DISTINCT ?uri ?label " +
                "WHERE " +
                "{ " +
                " <" + cantina + "> m:hasMember ?uri . " +
                " ?uri :denominazione ?label . " +
                "}";


        System.out.println(query);

        return new ResponseEntity(Query.executeQueryWithLabel(query), HttpStatus.OK);

    }

    //Funzione che data una regione tra quelle presenti nell'ontologia, ritorna la lista dei vini prodotti in quella regione presi da WikiData
    @GetMapping("/regione")
    public ResponseEntity<?> findWineByRegion(@RequestParam String regione){

        String query =
         "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
         "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
         "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
         "PREFIX wikibase: <http://wikiba.se/ontology#>\n" +
         "PREFIX bd: <http://www.bigdata.com/rdf#>\n" +
         "PREFIX schema: <http://schema.org/>\n" +
         "\n" +
         "SELECT distinct ?uri ?label WHERE {\n" +
         "      SERVICE <https://query.wikidata.org/sparql> {\n" +
         "        ?uri wdt:P279 wd:Q1125341.\n" +
         "        ?uri wdt:P131 ?r .\n" +
         "        ?r wdt:P31 wd:Q16110 .\n" +
         "        ?r rdfs:label \"" +regione +  "\"@it ." +
         "        ?uri wdt:P1389 ?d .\n" +
         "        ?d rdfs:label ?den .\n" +
         "\t\t?uri rdfs:label ?label .\n" +
         "        ?uri schema:description ?descr\n" +
         "\t}\n" +
         "    FILTER(lang(?descr)=\"en\")\n" +
         "    FILTER(lang(?label)=\"en\")\n" +
         "    FILTER(lang(?den)=\"en\")\n" +
         "}\n";

        System.out.println(query);


        return new ResponseEntity(Query.executeQueryWithLabel(query), HttpStatus.OK);

    }


    //Funzione che dato un vino di wikidata, ritorna la sua descrizione, la denonominazione e una sua immagine, fornita da wikidata
    @GetMapping("/detailswiki")
    public ResponseEntity<?> findWineWikidata(@RequestParam String vino){

        String strQuery  =
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n" +
                "PREFIX wd: <http://www.wikidata.org/entity/>\n" +
                "PREFIX wikibase: <http://wikiba.se/ontology#>\n" +
                "PREFIX bd: <http://www.bigdata.com/rdf#>\n" +
                "PREFIX schema: <http://schema.org/>\n" +
                "\n" +
                "SELECT distinct ?den ?des ?image WHERE {\n" +
                "      SERVICE <https://query.wikidata.org/sparql> {\n" +
                        "<" + vino +  "> wdt:P1389 ?d ;\n" +
                "                        schema:description ?des. \n" +
                "        ?d rdfs:label ?den .  " +
                "        OPTIONAL { <" + vino + "> wdt:P18 ?image }" +
                "}\n" +
                "    FILTER(lang(?den)=\"en\")\n" +
                "    FILTER(lang(?des)=\"en\")\n" +
                "}\n";

        System.out.println(strQuery);
        QueryExecution queryExecution = QueryExecutionFactory.sparqlService(Query.REPO_QUERY, strQuery);

        ResultSet results = queryExecution.execSelect();

        QuerySolution qs = results.next();

        String denominazione = Query.formatString(qs.get("?den").toString());
        String descrizione = Query.formatString(qs.get("?des").toString());

        String image = "";
        if(qs.get("?image")!=null){
            image = qs.get("?image").toString();
        }

        queryExecution.close();

        return new ResponseEntity(new String[] {denominazione,descrizione, image}, HttpStatus.OK);
    }


    //Funzione POST per creare un nuovo vino, utilizzando i dettagli del vino passati in input
    @PostMapping("/create")
    public ResponseEntity<?> createWine(@RequestBody Vino vino){

        System.out.println(vino.getName());

        System.out.println(vino.getColore());
        System.out.println(vino.getStruttura());

        String iri = vino.getName().replace(" ","");

        String strInsert = Query.PREFIX +
                "INSERT DATA" +
                "{  "+
                " <http://www.semanticweb.org/pisca/vinitaly#" + iri + "> :denominazione  \"" + vino.getName() +"\" ; " +
                " rdf:type :Vino ;" +
                " rdf:type " + vino.getColore() +" ;" +
                " rdf:type " + vino.getStruttura() +" ;" +
                " :annata \"" + vino.getAnnata() + "\" ; " +
                " :prezzo " + vino.getPrezzo() +" ; " +
                " :gradoAlcolico " + vino.getGrado() +" ; " +
                " :pressione " + vino.getPressione() +" ; " +
                " :haAroma <" + vino.getAroma()[0] +"> ; " +
                " :prodottoDa <" + vino.getVitigno()[0] +"> ; " +
                " m:isMemberOf <" + vino.getCantina() +"> ; " +
                " :haDosaggio <" + vino.getDosaggio() +"> ; " +
                " :vinoOriginatoIn <" + vino.getOrigine() +"> . " +
                "}";

        System.out.println(strInsert);

        UpdateRequest updateRequest = UpdateFactory.create(strInsert);

        UpdateProcessor updateProcessor = UpdateExecutionFactory.createRemote(updateRequest, REPO_INSERT);

        updateProcessor.execute();

        return ResponseEntity.ok("ok");


    }


}
