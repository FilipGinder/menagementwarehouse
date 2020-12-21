<div class="modal fade" id="modal_dodavanje_novog_proizvoda" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content" id="prikazivanje_odredjenog_klijenta">
      <div class="modal-header">
        <h5 class="modal-title" id="naslov_izmene_podataka_odredjenog_klijenta">Dodavanje novog proizvoda</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" id="zatvaranje_prikaza_jednog_klijenta">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	     <label for="dodavanje_novog_proizvoda_ime"><b>Ime proizvoda:</b></label>
              <input type="text" class="inputi_u_modalima" id="dodavanje_novog_proizvoda_ime" value="">
             <label for="dodavanje_novog_proizvoda_sirina"><b>Širina u centimetrima:</b></label>
      			  <input type="number" class="inputi_u_modalima" id="dodavanje_novog_proizvoda_sirina" value="">      
             <label for="dodavanje_novog_proizvoda_visina"><b>Visina u centimetrima:</b></label>
      			  <input type="number" class="inputi_u_modalima" id="dodavanje_novog_proizvoda_visina" value="">
      	     <label for="dodavanje_novog_proizvoda_duzina"><b>Dužina u metrima:</b></label>
      			  <input type="number" class="inputi_u_modalima" id="dodavanje_novog_proizvoda_duzina" value="">
      			 <label for="dodavanje_novog_proizvoda_cena_po_kubiku"><b>Cena po kubiku:</b></label>
      			  <input type="number" class="inputi_u_modalima" id="dodavanje_novog_proizvoda_cena_po_kubiku" value="">
      			 <label for="dodavanje_novog_proizvoda_kubikaza"><b>Kubikaža:</b></label>
      			  <input type="number" class="inputi_u_modalima" id="dodavanje_novog_proizvoda_kubikaza" value=""> 
             <label for="dodavanje_novog_proizvoda_limit"><b>Donji limit:</b></label>
              <input type="number" class="inputi_u_modalima" id="dodavanje_novog_proizvoda_limit" value="">     			 
        </div>
      <div class="modal-footer">
        <span>Dužinu obavezno unositi u <b style="color: red;">METRIMA</b> a sve ostale parametre u <b style="color: red;">CENTIMETRIMA</b></span>
        <button type="button" class="btn btn-secondary" id="zatvaranje_prikaza_jednog_klijenta1" data-dismiss="modal">Zatvori</button>
        <button type="button" id="unos_novog_proizvoda_sacuvaj" class="btn btn-primary">Sačuvaj</button>
      </div>
    </div>
  </div>
</div>