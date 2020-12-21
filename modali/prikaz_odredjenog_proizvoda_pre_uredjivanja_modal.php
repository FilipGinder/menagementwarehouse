<div class="modal fade" id="modal_prikaz_odredjenog_proizvoda_pre_uredjivanja" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content" id="prikazivanje_odredjenog_klijenta">
      <div class="modal-header">
        <h5 class="modal-title" id="">Izmena proizvoda ili unos novog stanja</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" id="zatvaranje_prikaza_jednog_proizvoda">&times;</span>
        </button>
      </div>
      <div class="modal-body">

             
      			  <input type="hidden" class="inputi_u_modalima" id="izmena_proizvoda_sirina" value="">

             
      			  <input type="hidden" class="inputi_u_modalima" id="izmena_proizvoda_visina" value="">

      			 
      			  <input type="hidden" class="inputi_u_modalima" id="izmena_proizvoda_duzina" value="">

      			 <label for="izmena_proizvoda_cena_po_kubiku"><b>Cena po kubiku:</b></label>
      			  <input type="number" class="inputi_u_modalima" id="izmena_proizvoda_cena_po_kubiku" value="">

      			 <label for="izmena_proizvoda_kubikaza"><b style="color: red;">Ukupna kubikaža - dodati novu količinu:</b></label>
      			  <input type="number" style="border: 1px solid red; outline: none;" placeholder="Dodati novu količinu ili ostaviti polje prazno" class="inputi_u_modalima" id="izmena_proizvoda_kubikaza" value="">

              <label for="izmena_proizvoda_donji_limit"><b>Donji limit u m³:</b></label>
              <input type="number" class="inputi_u_modalima" id="izmena_proizvoda_donji_limit" value="">

              <input type="hidden" id="skriven_prikaz_kubikaze_radi_daljeg_racunanja">
      			 
      </div>
      <div class="modal-footer">
        <select style="width:100%;" id="odabir_unosa_ili_izlaza_robe">
          <option selected value="unos_robe">Dodavanje na stanje</option>
          <option value="izlaz_robe">Umanjivanje stanja</option>
        </select>
        <button type="button" class="btn btn-secondary" id="zatvaranje_prikaza_jednog_proizvoda1" data-dismiss="modal">Zatvori</button>
        <button type="button" id="izmena_podataka_ili_unos_robe_proizvoda_sacuvaj" class="btn btn-primary">Sačuvaj</button>
      </div>
    </div>
  </div>
</div>