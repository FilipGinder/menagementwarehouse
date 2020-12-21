<div id="pregled_svih_faktura_jednog_klijenta">
  <div class="row" id="pregled_svih_faktura_jednog_klijenta_prvi_red">
    <div class="col-sm-11">
      <h5 class="modal-title w-100" style="font-size: 20px; text-align: center;" id="exampleModalPreviewLabel">Prikaz svih faktura klijenta: <span style="color: red;" id="prikaz_kog_klijenta_su_fakture"></span></h5>
      </div>
      <div class="col-sm-1">
                <button type="button" class="close " data-dismiss="modal" aria-label="Close">
                    <span style="font-size: 1.3em;" id="zatvaranje_modala_sve_fakture_jednog_klijenta_gornje" aria-hidden="true">&times;</span>
                </button>
    </div>
  </div>

  <div class="row">
         <div class="col-sm-12">
          <input type="hidden" id="da_znamo_cijeg_klijenta_su_fakture_prilikom_refresha">
                 <table style="width: 100%;" class="table table-bordered" id="prikaz_svih_faktura_jednog_klijenta" data-export-title="Tabela">

                          <thead>
                             <tr>
                               <td><b>R.B</b></td>
                               <td><b>Ime klijenta</b></td>
                               <td><b>Datum</b></td>
                               <td><b>Status</b></td>
                               <td><b>Valuta</b></td>
                               <td><b>Ukupna vrednost</b></td>
                               <td><b>Prikaži fakturu</b></td>
                               <td><b>Obriši fakturu</b></td>
                             </tr>
                           </thead>
                           <tbody>

                          </tbody>
                      
               </table>
          </div>
    </div>
  
   <div class="row">
       
       
             <div class="col-sm-11">
                
              </div>
        <div class="col-sm-1">
              <button type="button" class="btn btn-danger btn-md btn-rounded" id="zatvaranje_modala_sve_fakture_jednog_klijenta_donje" data-dismiss="modal">Zatvori</button>
        </div>
   </div>
</div>