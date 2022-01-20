package it.unito.vinitaly.model;

        /*

Classe per rappresentare un vino, composta da tutti i suoi dettagli con il quale può essere descritto.
Utilizzata per la query che ritorna i dettagli di un vino

*/
public class Vino{

    String name;
    String aroma[];
    String origine;
    String grado;
    String pressione;
    String annata;
    String prezzo;
    String dosaggio;
    String cantina;
    String vitigno[];
    String colore;
    String struttura;

    public Vino(String name, String[] aroma, String origine, String grado, String pressione, String annata, String prezzo, String dosaggio, String cantina, String[] vitigno, String colore, String struttura) {
        this.name = name;
        this.aroma = aroma;
        this.origine = origine;
        this.grado = grado;
        this.pressione = pressione;
        this.annata = annata;
        this.prezzo = prezzo;
        this.dosaggio = dosaggio;
        this.cantina = cantina;
        this.vitigno = vitigno;
        this.colore = colore;
        this.struttura = struttura;
    }

    public String getColore() {
        return colore;
    }

    public void setColore(String colore) {
        this.colore = colore;
    }

    public String getStruttura() {
        return struttura;
    }

    public void setStruttura(String struttura) {
        this.struttura = struttura;
    }

    public String getAnnata() {
        return annata;
    }

    public void setAnnata(String annata) {
        this.annata = annata;
    }

    public String getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(String prezzo) {
        this.prezzo = prezzo;
    }

    public String getDosaggio() {
        return dosaggio;
    }

    public void setDosaggio(String dosaggio) {
        this.dosaggio = dosaggio;
    }

    public String getCantina() {
        return cantina;
    }

    public void setCantina(String cantina) {
        this.cantina = cantina;
    }

    public String[] getVitigno() {
        return vitigno;
    }

    public void setVitigno(String vitigno[]) {
        this.vitigno = vitigno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getAroma() {
        return aroma;
    }

    public void setAroma(String aroma[]) {
        this.aroma = aroma;
    }

    public String getOrigine() {
        return origine;
    }

    public void setOrigine(String origine) {
        this.origine = origine;
    }

    public String getGrado() {
        return grado;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }

    public String getPressione() {
        return pressione;
    }

    public void setPressione(String pressione) {
        this.pressione = pressione;
    }



}
