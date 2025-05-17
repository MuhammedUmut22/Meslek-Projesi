// Bu opsiyonel kod service worker'ı kaydetmek için kullanılır.
// Varsayılan olarak register() çağrılmaz.

// Bu sayede uygulama, üretim ortamında sonraki ziyaretlerde daha hızlı yüklenir ve
// offline (çevrimdışı) çalışma yeteneği kazanır. Ancak bu, geliştiricilerin (ve kullanıcıların)
// yapılan güncellemeleri ancak sayfadaki tüm açık sekmeler kapatıldıktan sonra göreceği anlamına gelir,
// çünkü önceden cache'lenmiş kaynaklar arka planda güncellenir.

// Bu modelin avantajları ve nasıl etkinleştirileceği hakkında daha fazla bilgi için:
// http://bit.ly/CRA-PWA adresini ziyaret edin.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' || // Hostname localhost ise
    window.location.hostname === '[::1]' ||   // IPv6 localhost adresi ise
    window.location.hostname.match(             // IPv4 localhost aralığında ise
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Service worker'ı kaydeden fonksiyon
export function register(config) {
  // Sadece production ortamında ve serviceWorker desteği varsa çalışır
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // URL constructor tüm SW destekleyen tarayıcılarda mevcut
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Eğer PUBLIC_URL farklı bir origin'de ise service worker çalışmaz
      // (örneğin CDN kullanılıyorsa)
      return;
    }

    // Sayfa tamamen yüklendiğinde çalıştır
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`; // SW dosyasının yolu

      if (isLocalhost) {
        // Localhost üzerinde çalışıyorsak, service worker'ın varlığını kontrol et
        checkValidServiceWorker(swUrl, config);

        // Localhost için ekstra loglama yap
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Bu web uygulaması cache-first (öncelikle önbellekten) ' +
              'service worker tarafından servis ediliyor. Daha fazla bilgi için http://bit.ly/CRA-PWA adresini ziyaret edin.'
          );
        });
      } else {
        // Localhost değilse doğrudan service worker'ı kaydet
        registerValidSW(swUrl, config);
      }
    });
  }
}

// Geçerli service worker'ı kaydeden fonksiyon
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl) // SW dosyasını kaydet
    .then(registration => {
      // Yeni bir güncelleme bulunduğunda tetiklenir
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        // Service worker'ın durumu değiştikçe kontrol et
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Yeni içerik indirildi, ancak eski SW eski içeriği servis etmeye devam ediyor.
              // Tüm sekmeler kapatıldıktan sonra yeni içerik kullanılacak.
              console.log(
                'Yeni içerik mevcut ve tüm bu sayfanın sekmeleri kapatıldığında kullanılacak. Detaylar için http://bit.ly/CRA-PWA.'
              );

              // Eğer config.onUpdate varsa çağır
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // İlk defa cache'leme tamamlandı
              console.log('İçerik offline kullanım için cachelendi.');

              // Eğer config.onSuccess varsa çağır
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      // Kayıt sırasında hata olursa konsola yazdır
      console.error('Service worker kaydı sırasında hata:', error);
    });
}

// Service worker dosyasının geçerli olup olmadığını kontrol eder
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl)
    .then(response => {
      // SW dosyasının varlığını ve tipini kontrol et
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 || // Dosya bulunamadıysa
        (contentType != null && contentType.indexOf('javascript') === -1) // Dosya JS değilse
      ) {
        // Muhtemelen farklı bir uygulama, SW'yi kaldır ve sayfayı yenile
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // SW bulundu, normal şekilde kaydetmeye devam et
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      // İnternet bağlantısı yoksa offline modda çalıştığını bildir
      console.log(
        'İnternet bağlantısı bulunamadı. Uygulama offline modda çalışıyor.'
      );
    });
}

// Service worker kaydını kaldıran fonksiyon
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister(); // SW kaydını kaldır
    });
  }
}
