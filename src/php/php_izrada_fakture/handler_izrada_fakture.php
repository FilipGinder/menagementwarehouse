<?php 
require_once 'class_izrada_fakture.php';

if(isset($_POST['verifikacija_prikaz_imena_klijenata_za_select']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->prikaz_imena_klijenata_za_select();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_select_popuna_podataka_klijenta']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->select_popuna_podataka_klijenta();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_punjenje_selekta_sa_imenima_proizvoda']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->punjenje_selekta_sa_imenima_proizvoda();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_cuvanje_osnovnih_podataka_o_fakturi']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->cuvanje_osnovnih_podataka_o_fakturi();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_odabir_proizvoda_iz_dataliste_za_unos_u_fakturu']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->odabir_proizvoda_iz_dataliste_za_unos_u_fakturu();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_unos_vrednosti_jednog_reda_fakture_u_bazu']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->unos_vrednosti_jednog_reda_fakture_u_bazu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_izbrisi_odredjeni_red_iz_fakture']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->izbrisi_odredjeni_red_iz_fakture();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_ispis_trenuto_ukupne_cifre_na_fakturie']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->ispis_trenuto_ukupne_cifre_na_fakturie();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_obrisi_fakturu_u_izradi']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->obrisi_fakturu_u_izradi();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_rednog_broja_i_godine_pravljenja_fakture']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->prikaz_rednog_broja_i_godine_pravljenja_fakture();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_izracunaj_ukupnu_vrednost_za_fakturu']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->izracunaj_ukupnu_vrednost_za_fakturu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_sacuvaj_u_bazu_podatke_o_ukupnoj_vrednosti_za_fakturu']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->sacuvaj_u_bazu_podatke_o_ukupnoj_vrednosti_za_fakturu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_provera_da_li_izabranog_proizvoda_ima_dovoljno_na_stanju']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->provera_da_li_izabranog_proizvoda_ima_dovoljno_na_stanju();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_funkcija_za_umanjivanje_stanja_magacina_fakturom']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->funkcija_za_umanjivanje_stanja_magacina_fakturom();
  exit(json_encode($rezultat));
}



if(isset($_POST['verifikacija_uzimanje_informacija_o_proizvodu_zbog_uvecanja_stanja']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->uzimanje_informacija_o_proizvodu_zbog_uvecanja_stanja();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_funkcija_za_uvecanje_stanja_magacina_brisanjem_jednog_reda']))
{
  $objekat = new izrada_faktura();
  $rezultat = $objekat->funkcija_za_uvecanje_stanja_magacina_brisanjem_jednog_reda();
  exit(json_encode($rezultat));
}
 ?>