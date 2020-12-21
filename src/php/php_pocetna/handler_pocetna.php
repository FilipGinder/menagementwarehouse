<?php 
require_once 'class_pocetna.php';

if(isset($_POST['verifikacija_prikaz_podataka_o_korisniku_na_pocetnoj']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_podataka_o_korisniku_na_pocetnoj();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_godina_u_selectu']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_godina_u_selectu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_imena_klijenata_u_selectu']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_imena_klijenata_u_selectu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_svih_faktura_na_pocetnoj_strani']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_svih_faktura_na_pocetnoj_strani();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_izmena_podataka_o_korisniku_na_pocetnoj']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->izmena_podataka_o_korisniku_na_pocetnoj();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_provera_da_li_klijent_postoji_u_bazi']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->provera_da_li_klijent_postoji_u_bazi();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_dodavanje_novog_klijenta']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->dodavanje_novog_klijenta();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_pregled_svih_klijenata']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->pregled_svih_klijenata();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_prikazi_odredjenog_klijenta_pre_uredjivanja']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikazi_odredjenog_klijenta_pre_uredjivanja();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_izmena_podataka_klijenta']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->izmena_podataka_klijenta();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_obrisi_klijenta']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->obrisi_klijenta();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_provera_da_li_proizvod_postoji_u_bazi']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->provera_da_li_proizvod_postoji_u_bazi();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_unos_novog_proizvoda']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->unos_novog_proizvoda();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_pregled_magacina']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->pregled_magacina();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_pregled_ukupnih_vrednosti_magacina']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->pregled_ukupnih_vrednosti_magacina();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_prikazi_odredjenog_proizvod_pre_uredjivanja']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikazi_odredjenog_proizvod_pre_uredjivanja();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_izmena_podataka_proizvoda']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->izmena_podataka_proizvoda();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_izmena_podataka_proizvoda_promenjena_kubikaza']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->izmena_podataka_proizvoda_promenjena_kubikaza();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_obrisi_proizvod']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->obrisi_proizvod();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_izvrsenih_faktura();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_izvrsenih();
  exit(json_encode($rezultat));
}



if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_faktura_na_cekanju();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_na_cekanju();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_faktura']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_faktura();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenu_godinu']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_za_odredjenu_godinu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_po_godinima']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_po_godinima();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_po_godinama']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_izvrsenih_faktura_po_godinama();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_po_godinima']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_po_godinima();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju_po_godinama']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_faktura_na_cekanju_po_godinama();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_faktura_po_godinama']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_faktura_po_godinama();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_svih_faktura_jednog_klijenta']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_svih_faktura_jednog_klijenta();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_uzimanje_imena_kllijenta_za_naslov_svih_klijentovih_faktura']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_imena_kllijenta_za_naslov_svih_klijentovih_faktura();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_obrisi_fakturu_sa_pocetne_strane_ili_iz_modala_pregled_svih_klijentovih_faktura']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->obrisi_fakturu_sa_pocetne_strane_ili_iz_modala_pregled_svih_klijentovih_faktura();
  exit(json_encode($rezultat));
}


//PRIKAZ FAKTURE
if(isset($_POST['verifikacija_prikazi_vrednosti_fakture_i_preuzmi_id_klijenta']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikazi_vrednosti_fakture_i_preuzmi_id_klijenta();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_preuzimanje_podataka_o_odabranom_klijentu']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->preuzimanje_podataka_o_odabranom_klijentu();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_artikala_redova_fakture']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_artikala_redova_fakture();
  exit(json_encode($rezultat));
}
//PRIKAZ FAKTURE



if(isset($_POST['verifikacija_promena_statusa_fakture']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->promena_statusa_fakture();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_sve_godine_i_odredjeni_klijent']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_izvrsenih_faktura_za_sve_godine_i_odredjeni_klijent();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_sve_godine_i_odredjeni_klijent']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_na_cekanju_faktura_za_sve_godine_i_odredjeni_klijent();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_ukupno_faktura_za_sve_godine_i_odredjeni_klijent']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_ukupno_faktura_za_sve_godine_i_odredjeni_klijent();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta_i_odredjenu_godinu']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta_i_odredjenu_godinu();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent_i_odredjena_godina']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent_i_odredjena_godina();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent_i_odredjena_godina']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent_i_odredjena_godina();
  exit(json_encode($rezultat));
}









if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_odredjenu_godinu_i_odredjeni_klijent']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_izvrsenih_faktura_za_odredjenu_godinu_i_odredjeni_klijent();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_odredjenu_godinu_i_odredjeni_klijent']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_na_cekanju_faktura_za_odredjenu_godinu_i_odredjeni_klijent();
  exit(json_encode($rezultat));
}

if(isset($_POST['verifikacija_prikaz_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->prikaz_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent();
  exit(json_encode($rezultat));
}
if(isset($_POST['verifikacija_uzimanje_broja_redova_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent']))
{
  $objekat = new class_pocetna();
  $rezultat = $objekat->uzimanje_broja_redova_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent();
  exit(json_encode($rezultat));
}
 ?>