# Rentacar

Bu proje [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3 ile oluşturulmuştur.
Projeyi çalıştırmak için `ng serve` komutunu terminale yazınız. Tarayıcınızdan `http://localhost:54540/` adresine gidiniz

Bu repo [RecapProject](https://github.com/TulparN/ReCapProject) FrontEnd Kısmıdır.
Html için boostrap 5 kullanılmıştır
Projede kullanıcı kaydı ve ya giriş yapılması zorunludur. Giriş yapılmadan kiralama işlemi hariç diğer operasyonlar yapılmamaktadır.
Backend kısmındaki her bir entity için bir component oluşturulmuştur. Bu componentlerden gelen erileri WebApı ile haberleşmesi için her bir controller için 
o controller isminde service yazılarak kendimizi tekrar etmekten kurtulduk. Entitylerin ise aynı zamanda birer modelini oluşturarak tekrardan kendimizi tekrar etmemiş olduk
ve spagetti diye tabir edilen kodlamadan kurtulduk. Aşağıda yapmış olduğum FrontEnd için örnek fotoğraflar bulunmaktadır. Bütün operasyonlar çalışmakta ve kusursuz bir düzen içindedir.
Kullanılan Package lar Aşağıdaki Gibidir.
- @angular/animations": "^11.2.5",
- "@angular/common": "~11.2.4",
- "@angular/compiler": "~11.2.4",
- "@angular/core": "~11.2.4",
- "@angular/forms": "~11.2.4",
- "@angular/platform-browser": "~11.2.4",
- "@angular/platform-browser-dynamic": "~11.2.4",
- "@angular/router": "~11.2.4",
- "bootstrap": "^5.0.0-beta2",
- "bootstrap-modal": "^2.2.4",
- "bootstrap-offcanvas": "^1.0.0",
- "jquery": "^3.6.0",
- "ngx-bootstrap": "^6.2.0",
- "ngx-bootstrap-modal": "^2.0.1",
- "ngx-modal-dialog": "^4.0.0",
- "ngx-toastr": "^13.2.1",
- "offcanvas": "^3.2.2",
- "offcanvas-bootstrap": "^2.5.2",
- "rxjs": "~6.6.0",
- "tslib": "^2.0.0",
- "zone.js": "~0.11.3"

![register](https://user-images.githubusercontent.com/48188046/114308653-55a90900-9aed-11eb-9f42-dafb5ead2e43.jpg)
![login](https://user-images.githubusercontent.com/48188046/114308673-5e99da80-9aed-11eb-8b40-4700374edbc0.jpg)
![anasayfa](https://user-images.githubusercontent.com/48188046/114308681-60639e00-9aed-11eb-9c7e-ef91b8c0ee5b.jpg)
![Araç sil](https://user-images.githubusercontent.com/48188046/114309951-afabcd80-9af1-11eb-90af-54d181e9ce37.jpg)
![araç ekle](https://user-images.githubusercontent.com/48188046/114309954-b1759100-9af1-11eb-8bd3-e4110f482ceb.jpg)
