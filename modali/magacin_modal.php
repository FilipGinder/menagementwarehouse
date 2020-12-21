<div id="pregled_magacina_modal">
  <div class="row">
    <div class="col-sm-11">
      <h5 class="modal-title w-100" style="font-size: 20px; text-align: center;" id="exampleModalPreviewLabel">Prikaz magacina</h5>
      </div>
      <div class="col-sm-1">
                <button type="button" style="text-align: right;" class="close" id="dugme_zatvaranje_modal_gornje" data-dismiss="modal" aria-label="Close">
                    <span style="font-size: 1.3em;" aria-hidden="true">&times;</span>
                </button>
    </div>
  </div>

  <div class="row">
         <div class="col-sm-12">
          <table class="table table-bordered" id="prikaz_magacina_u_tabeli">

                <thead>
                 <tr>
                   <td><b>R.B</b></td>
                   <td><b>Ime proizvoda</b></td>
                   <td><b>Donji limit</b></td>
                   <td><b>Širina</b></td>
                   <td><b>Visina</b></td>
                   <td><b>Dužina</b></td>
                   <td><b>Cena po komadu</b></td>
                   <td><b>Broj komada</b></td>
                   <td><b>Cena po kubiku</b></td>
                   <td><b>Ukupna kubikaza</b></td>
                   <td><b>Ukupna vrednost proizvoda</b></td>
                   <td><b>Uredi</b></td>
                   <td><b>Izbriši</b></td>
                 </tr>
                 </thead>
                 <tbody id="modal_body_prikaz_magacina">

                </tbody>
                <tfoot>
                 <tr>
                   <td><b>R.B</b></td>
                   <td><b>Ime proizvoda</b></td>
                   <td><b>Donji limit</b></td>
                   <td><b>Širina</b></td>
                   <td><b>Visina</b></td>
                   <td><b>Dužina</b></td>
                   <td><b>Cena po komadu</b></td>
                   <td><b>Broj komada</b></td>
                   <td><b>Cena po kubiku</b></td>
                   <td><b>Ukupna kubikaza</b></td>
                   <td><b>Ukupna vrednost proizvoda</b></td>
                   <td><b>Uredi</b></td>
                   <td><b>Izbriši</b></td>
                 </tr>
                 </tfoot>
            
     </table>
          </div>
    </div>
  
   <div class="row">
       
       
             <div class="col-sm-5" id="ukupna_kubikaza_stovarista">
                <h4>Trenutna ukupna vrednost robe na stovarištu je: <span id="ispis_ukupne_kubikaze_na_stovaristu">    </span>&nbsp; RSD
                </h4>
              </div>
              <div class="col-sm-5" id="ukupna_vrednosti_stovarista">
                <h4>Trenutna ukupna zapremina robe na stovarištu je: <span id="ispis_ukupne_vrednosti_robe_na_stovaristu"></span>&nbsp; m³
                </h4>
              </div>
        <div class="col-sm-2">
              <button type="button" style="float: right;" class="btn btn-danger btn-md btn-rounded" id="dugme_zatvaranje_modal_donje" data-dismiss="modal">Zatvori</button>
        </div>
   </div>
</div>