export const SUPPORTED_LOCALES = ["de", "en", "es", "it", "fr", "nl"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_TAGS: Record<Locale, string> = {
  de: "de-DE",
  en: "en-US",
  es: "es-ES",
  it: "it-IT",
  fr: "fr-FR",
  nl: "nl-NL",
};

type TranslationKey =
  | "app_title"
  | "app_description"
  | "gallery_missing_supabase"
  | "gallery_load_error"
  | "gallery_load_failed"
  | "gallery_no_images"
  | "gallery_skipped_images"
  | "gallery_no_images_query"
  | "gallery_headline"
  | "qr_scan_your"
  | "qr_image"
  | "intro_hint"
  | "intro_title"
  | "intro_card_hint"
  | "intro_card_details"
  | "intro_continue"
  | "claim_missing_code_title"
  | "claim_missing_code_body"
  | "claim_label"
  | "claim_load_failed_title"
  | "claim_not_found_title"
  | "claim_not_found_body"
  | "claim_code_label"
  | "claim_memory"
  | "claim_your_image"
  | "claim_title"
  | "claim_demo_body"
  | "claim_stripe_body"
  | "claim_primary_button"
  | "claim_name"
  | "claim_email"
  | "claim_name_placeholder"
  | "claim_email_placeholder"
  | "claim_name_required"
  | "claim_email_required"
  | "claim_email_invalid"
  | "claim_checkout_loading"
  | "claim_checkout_preparing"
  | "claim_checkout_demo_button"
  | "claim_checkout_button"
  | "claim_demo_note"
  | "claim_checkout_note"
  | "checkout_start_failed"
  | "demo_checkout_disabled_title"
  | "demo_checkout_disabled_body"
  | "demo_checkout_missing_code_title"
  | "demo_checkout_missing_code_body"
  | "demo_checkout_image_missing_title"
  | "demo_checkout_image_missing_body"
  | "payment_label"
  | "demo_checkout_title"
  | "demo_checkout_body"
  | "card_name"
  | "card_name_placeholder"
  | "card_number"
  | "expiry"
  | "cvc"
  | "claim_code_dash"
  | "demo_buy_button"
  | "demo_processing"
  | "demo_mode_note"
  | "demo_payment_failed"
  | "demo_fill_payment_fields"
  | "success_missing_title"
  | "success_missing_body"
  | "success_load_failed_title"
  | "success_load_failed_body"
  | "success_ready_title"
  | "success_pending_title"
  | "success_ready_body"
  | "success_pending_body"
  | "save_image"
  | "save_preparing"
  | "share_image"
  | "share_preparing"
  | "share_sheet_opened"
  | "opened_new_tab"
  | "download_started"
  | "download_not_ready"
  | "download_failed"
  | "share_native_text"
  | "share_title"
  | "share_copied"
  | "share_not_available"
  | "share_cancelled"
  | "demo_success_label"
  | "demo_success_title"
  | "demo_success_body"
  | "demo_success_disabled_title"
  | "demo_success_disabled_body"
  | "demo_success_missing_code_title"
  | "demo_success_missing_code_body"
  | "demo_success_image_missing_title"
  | "demo_success_image_missing_body";

const translations: Record<Locale, Record<TranslationKey, string>> = {
  de: {
    app_title: "EasyTerminal Demo",
    app_description:
      "Eigenständige Demo für den EasyTerminal-Bildschirm mit durchlaufenden Bildern, QR-Codes und Intro-Popup.",
    gallery_missing_supabase:
      "Die Supabase-Umgebungsvariablen fehlen noch. Hinterlege NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
    gallery_load_error: "Die Galerie konnte nicht aus Supabase geladen werden.",
    gallery_load_failed: "Die Galerie konnte nicht geladen werden.",
    gallery_no_images: "Keine Bilder gefunden.",
    gallery_skipped_images:
      "{count} Einträge wurden geladen, hatten aber keine auflösbare Bild-URL. Prüfe image_url, thumbnail_url oder storage_path.",
    gallery_no_images_query: "Aktuell liefert die Tabelle photos keine Bilder für diese Abfrage.",
    gallery_headline: "Scanne den QR-Code und öffne dein Bild auf dem Handy",
    qr_scan_your: "Scanne dein",
    qr_image: "Bild",
    intro_hint: "Demo-Hinweis",
    intro_title: "Scanne mit QR-Code, wie der Parkbesucher.",
    intro_card_hint:
      "Für den Zahlungstest nutze bitte die Demo-Karte 4242 4242 4242 4242.",
    intro_card_details: "Ablaufdatum: 12/27 CVC: 123 Name beliebig.",
    intro_continue: "Weiter",
    claim_missing_code_title: "Kein Claim-Code gefunden.",
    claim_missing_code_body:
      "Öffne den QR-Code direkt über die Kamera-App oder prüfe, ob der Link einen code-Parameter enthält.",
    claim_label: "Claim",
    claim_load_failed_title: "Das Bild konnte gerade nicht geladen werden.",
    claim_not_found_title: "Dieses Bild konnten wir gerade nicht finden.",
    claim_not_found_body:
      "Der Code wurde erkannt, aber in photos konnte kein passender Eintrag geladen werden. Prüfe den QR-Code oder teste mit einem aktuellen Bild aus dem Screen.",
    claim_code_label: "Code",
    claim_memory: "Deine Erinnerung",
    claim_your_image: "Dein Bild",
    claim_title: "Sichere dir deine Erinnerung.",
    claim_demo_body:
      "Öffne dein Bild auf dem Handy, gib kurz deinen Namen und deine E-Mail an und gehe danach direkt in die Demo-Zahlungsmaske.",
    claim_stripe_body:
      "Öffne dein Bild auf dem Handy, gib kurz deinen Namen und deine E-Mail an und wechsle danach direkt in den sicheren Checkout.",
    claim_primary_button: "Erinnerung sichern",
    claim_name: "Name",
    claim_email: "E-Mail",
    claim_name_placeholder: "Vorname Nachname",
    claim_email_placeholder: "dein.name@email.com",
    claim_name_required: "Bitte gib deinen Namen ein.",
    claim_email_required: "Bitte gib deine E-Mail ein.",
    claim_email_invalid: "Bitte gib eine gültige E-Mail ein.",
    claim_checkout_loading: "Checkout wird geladen...",
    claim_checkout_preparing: "Checkout wird vorbereitet...",
    claim_checkout_demo_button: "Weiter zur Demo-Zahlung",
    claim_checkout_button: "Weiter zum Checkout",
    claim_demo_note:
      "Demo-Zahlung aktiv. Die Präsentation läuft additiv über eine eigene Claim-Strecke und verändert keine bestehende Stripe- oder Supabase-Logik der anderen Projekte.",
    claim_checkout_note:
      "Der Checkout läuft additiv über eine eigene Claim-Strecke und verändert keine bestehende Stripe- oder Supabase-Logik der anderen Projekte.",
    checkout_start_failed: "Checkout konnte nicht gestartet werden.",
    demo_checkout_disabled_title: "Demo-Checkout ist nicht aktiv.",
    demo_checkout_disabled_body:
      "Setze ALLOW_MOCK_CHECKOUT=true, damit diese Test-Zahlungsseite verfügbar ist.",
    demo_checkout_missing_code_title: "Kein Claim-Code gefunden.",
    demo_checkout_missing_code_body:
      "Öffne diese Seite direkt über den Claim-Flow, damit die Demo-Zahlung geladen werden kann.",
    demo_checkout_image_missing_title: "Bild konnte nicht geladen werden.",
    demo_checkout_image_missing_body:
      "Für die Demo-Zahlung konnte kein passendes Bild zu diesem Code gefunden werden.",
    payment_label: "Zahlung",
    demo_checkout_title: "Demo-Kauf abschließen.",
    demo_checkout_body:
      "Diese Zahlungsmaske ist nur für die Vorführung. Beliebige Kartendaten funktionieren, es wird nichts belastet und das Bild wird danach direkt freigeschaltet.",
    card_name: "Name auf der Karte",
    card_name_placeholder: "Max Mustermann",
    card_number: "Kartennummer",
    expiry: "Ablaufdatum",
    cvc: "CVC",
    claim_code_dash: "Claim-Code",
    demo_buy_button: "Jetzt kaufen {price}",
    demo_processing: "Zahlung wird verarbeitet...",
    demo_mode_note:
      "Demo-Modus aktiv. Jede eingegebene Karte führt direkt zur Freischaltung des Bildes.",
    demo_payment_failed: "Demo-Zahlung fehlgeschlagen.",
    demo_fill_payment_fields: "Bitte fülle alle Kartenfelder für die Demo aus.",
    success_missing_title: "Keine Freischaltung gefunden.",
    success_missing_body:
      "Öffne diese Seite über den Kauf- oder Demo-Checkout-Redirect, damit dein Kauf geladen werden kann.",
    success_load_failed_title: "Die Zahlung ist durch, aber die Freischaltung fehlt noch.",
    success_load_failed_body: "Freischaltung konnte nicht geladen werden.",
    success_ready_title: "Dein Bild ist jetzt verfügbar.",
    success_pending_title: "Freischaltung wird geprüft.",
    success_ready_body: "Du kannst dein Bild jetzt speichern oder direkt mit Freunden teilen.",
    success_pending_body: "Die Zahlung wird verarbeitet. Wir schalten dein Bild direkt danach frei.",
    save_image: "Bild speichern",
    save_preparing: "Speichern wird vorbereitet...",
    share_image: "Bild teilen",
    share_preparing: "Teilen wird vorbereitet...",
    share_sheet_opened: "Teilen oder in Fotos sichern geöffnet.",
    opened_new_tab: "Bild im neuen Tab geöffnet.",
    download_started: "Download gestartet.",
    download_not_ready: "Das Bild steht noch nicht zum Download bereit.",
    download_failed: "Das Bild konnte nicht geladen werden.",
    share_native_text: "Du kannst das Bild jetzt teilen oder in Fotos sichern.",
    share_title: "Meine Erinnerung",
    share_copied: "Link kopiert.",
    share_not_available: "Teilen ist auf diesem Gerät gerade nicht verfügbar.",
    share_cancelled: "Teilen wurde abgebrochen.",
    demo_success_label: "Demo-Erfolg",
    demo_success_title: "Dein Bild ist jetzt freigeschaltet.",
    demo_success_body:
      "Die Demo-Zahlung war erfolgreich. Du kannst das Bild jetzt speichern oder direkt teilen.",
    demo_success_disabled_title: "Demo-Erfolg ist nicht aktiv.",
    demo_success_disabled_body:
      "Setze ALLOW_MOCK_CHECKOUT=true, damit diese Test-Freischaltung verfügbar ist.",
    demo_success_missing_code_title: "Kein Claim-Code gefunden.",
    demo_success_missing_code_body:
      "Öffne diese Seite direkt über den Demo-Checkout, damit das Bild geladen werden kann.",
    demo_success_image_missing_title: "Bild konnte nicht geladen werden.",
    demo_success_image_missing_body:
      "Für diese Demo-Freischaltung wurde kein passendes Bild gefunden.",
  },
  en: {
    app_title: "EasyTerminal Demo",
    app_description:
      "Standalone EasyTerminal screen demo with scrolling images, QR codes, and an intro popup.",
    gallery_missing_supabase:
      "Supabase environment variables are still missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
    gallery_load_error: "The gallery could not be loaded from Supabase.",
    gallery_load_failed: "The gallery could not be loaded.",
    gallery_no_images: "No images found.",
    gallery_skipped_images:
      "{count} entries were loaded but had no resolvable image URL. Check image_url, thumbnail_url, or storage_path.",
    gallery_no_images_query: "The photos table is not returning any images for this query right now.",
    gallery_headline: "Scan the QR code and open your image on your phone",
    qr_scan_your: "Scan your",
    qr_image: "image",
    intro_hint: "Demo Note",
    intro_title: "Scan with the QR code like a park visitor.",
    intro_card_hint: "For the payment test, please use the demo card 4242 4242 4242 4242.",
    intro_card_details: "Expiry date: 12/27 CVC: 123 Any name works.",
    intro_continue: "Continue",
    claim_missing_code_title: "No claim code found.",
    claim_missing_code_body:
      "Open the QR code directly from your camera app or check whether the link contains a code parameter.",
    claim_label: "Claim",
    claim_load_failed_title: "The image could not be loaded right now.",
    claim_not_found_title: "We could not find this image right now.",
    claim_not_found_body:
      "The code was recognized, but no matching entry could be loaded from photos. Check the QR code or try a current image from the screen.",
    claim_code_label: "Code",
    claim_memory: "Your memory",
    claim_your_image: "Your image",
    claim_title: "Keep your memory.",
    claim_demo_body:
      "Open your image on your phone, enter your name and email, and then continue directly to the demo payment screen.",
    claim_stripe_body:
      "Open your image on your phone, enter your name and email, and then continue directly to secure checkout.",
    claim_primary_button: "Save this memory",
    claim_name: "Name",
    claim_email: "Email",
    claim_name_placeholder: "First Last",
    claim_email_placeholder: "your.name@email.com",
    claim_name_required: "Please enter your name.",
    claim_email_required: "Please enter your email.",
    claim_email_invalid: "Please enter a valid email address.",
    claim_checkout_loading: "Loading checkout...",
    claim_checkout_preparing: "Preparing checkout...",
    claim_checkout_demo_button: "Continue to demo payment",
    claim_checkout_button: "Continue to checkout",
    claim_demo_note:
      "Demo payment is active. This presentation runs in its own claim flow and does not affect any existing Stripe or Supabase logic in the other projects.",
    claim_checkout_note:
      "This checkout runs in its own claim flow and does not affect any existing Stripe or Supabase logic in the other projects.",
    checkout_start_failed: "Checkout could not be started.",
    demo_checkout_disabled_title: "Demo checkout is not active.",
    demo_checkout_disabled_body:
      "Set ALLOW_MOCK_CHECKOUT=true to make this test payment page available.",
    demo_checkout_missing_code_title: "No claim code found.",
    demo_checkout_missing_code_body:
      "Open this page directly from the claim flow so the demo payment can be loaded.",
    demo_checkout_image_missing_title: "Image could not be loaded.",
    demo_checkout_image_missing_body:
      "No matching image could be found for this code for the demo payment.",
    payment_label: "Payment",
    demo_checkout_title: "Complete the demo purchase.",
    demo_checkout_body:
      "This payment screen is only for demonstration purposes. Any card details will work, nothing is charged, and the image is unlocked right away.",
    card_name: "Name on card",
    card_name_placeholder: "Max Mustermann",
    card_number: "Card number",
    expiry: "Expiry date",
    cvc: "CVC",
    claim_code_dash: "Claim code",
    demo_buy_button: "Buy now {price}",
    demo_processing: "Processing payment...",
    demo_mode_note: "Demo mode is active. Any entered card unlocks the image immediately.",
    demo_payment_failed: "Demo payment failed.",
    demo_fill_payment_fields: "Please complete all card fields for the demo.",
    success_missing_title: "No unlock found.",
    success_missing_body:
      "Open this page through the purchase or demo checkout redirect so your purchase can be loaded.",
    success_load_failed_title: "The payment went through, but the unlock is still missing.",
    success_load_failed_body: "The unlock could not be loaded.",
    success_ready_title: "Your image is now available.",
    success_pending_title: "Unlock is being checked.",
    success_ready_body: "You can now save your image or share it directly with friends.",
    success_pending_body: "The payment is being processed. We will unlock your image right after that.",
    save_image: "Save image",
    save_preparing: "Preparing save...",
    share_image: "Share image",
    share_preparing: "Preparing share...",
    share_sheet_opened: "Share or save to photos opened.",
    opened_new_tab: "Image opened in a new tab.",
    download_started: "Download started.",
    download_not_ready: "The image is not ready for download yet.",
    download_failed: "The image could not be loaded.",
    share_native_text: "You can now share the image or save it to photos.",
    share_title: "My memory",
    share_copied: "Link copied.",
    share_not_available: "Sharing is not available on this device right now.",
    share_cancelled: "Sharing was cancelled.",
    demo_success_label: "Demo Success",
    demo_success_title: "Your image is now unlocked.",
    demo_success_body:
      "The demo payment was successful. You can now save the image or share it directly.",
    demo_success_disabled_title: "Demo success is not active.",
    demo_success_disabled_body:
      "Set ALLOW_MOCK_CHECKOUT=true to make this test unlock available.",
    demo_success_missing_code_title: "No claim code found.",
    demo_success_missing_code_body:
      "Open this page directly through the demo checkout so the image can be loaded.",
    demo_success_image_missing_title: "Image could not be loaded.",
    demo_success_image_missing_body:
      "No matching image could be found for this demo unlock.",
  },
  es: {
    app_title: "Demo EasyTerminal",
    app_description:
      "Demo independiente de la pantalla EasyTerminal con imágenes en movimiento, códigos QR y un popup inicial.",
    gallery_missing_supabase:
      "Faltan las variables de entorno de Supabase. Añade NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.",
    gallery_load_error: "No se pudo cargar la galería desde Supabase.",
    gallery_load_failed: "No se pudo cargar la galería.",
    gallery_no_images: "No se encontraron imágenes.",
    gallery_skipped_images:
      "Se cargaron {count} entradas, pero no tenían una URL de imagen válida. Revisa image_url, thumbnail_url o storage_path.",
    gallery_no_images_query: "La tabla photos no está devolviendo imágenes para esta consulta en este momento.",
    gallery_headline: "Escanea el código QR y abre tu imagen en el móvil",
    qr_scan_your: "Escanea tu",
    qr_image: "imagen",
    intro_hint: "Aviso Demo",
    intro_title: "Escanea con el código QR como un visitante del parque.",
    intro_card_hint: "Para la prueba de pago, usa la tarjeta demo 4242 4242 4242 4242.",
    intro_card_details: "Caducidad: 12/27 CVC: 123 Cualquier nombre sirve.",
    intro_continue: "Continuar",
    claim_missing_code_title: "No se encontró ningún código.",
    claim_missing_code_body:
      "Abre el código QR directamente desde la app de cámara o comprueba si el enlace contiene el parámetro code.",
    claim_label: "Claim",
    claim_load_failed_title: "No se pudo cargar la imagen ahora mismo.",
    claim_not_found_title: "No hemos podido encontrar esta imagen ahora mismo.",
    claim_not_found_body:
      "Se reconoció el código, pero no se pudo cargar ninguna entrada coincidente desde photos. Revisa el código QR o prueba con una imagen actual de la pantalla.",
    claim_code_label: "Código",
    claim_memory: "Tu recuerdo",
    claim_your_image: "Tu imagen",
    claim_title: "Guarda tu recuerdo.",
    claim_demo_body:
      "Abre tu imagen en el móvil, introduce tu nombre y correo electrónico, y continúa a la pantalla de pago demo.",
    claim_stripe_body:
      "Abre tu imagen en el móvil, introduce tu nombre y correo electrónico, y continúa al checkout seguro.",
    claim_primary_button: "Guardar recuerdo",
    claim_name: "Nombre",
    claim_email: "Correo electrónico",
    claim_name_placeholder: "Nombre Apellido",
    claim_email_placeholder: "tu.nombre@email.com",
    claim_name_required: "Introduce tu nombre.",
    claim_email_required: "Introduce tu correo electrónico.",
    claim_email_invalid: "Introduce un correo electrónico válido.",
    claim_checkout_loading: "Cargando checkout...",
    claim_checkout_preparing: "Preparando checkout...",
    claim_checkout_demo_button: "Continuar al pago demo",
    claim_checkout_button: "Continuar al checkout",
    claim_demo_note:
      "El pago demo está activo. Esta presentación funciona en su propio flujo de claim y no modifica la lógica existente de Stripe o Supabase en los otros proyectos.",
    claim_checkout_note:
      "Este checkout funciona en su propio flujo de claim y no modifica la lógica existente de Stripe o Supabase en los otros proyectos.",
    checkout_start_failed: "No se pudo iniciar el checkout.",
    demo_checkout_disabled_title: "El checkout demo no está activo.",
    demo_checkout_disabled_body:
      "Configura ALLOW_MOCK_CHECKOUT=true para habilitar esta página de prueba.",
    demo_checkout_missing_code_title: "No se encontró ningún código.",
    demo_checkout_missing_code_body:
      "Abre esta página directamente desde el flujo de claim para cargar el pago demo.",
    demo_checkout_image_missing_title: "No se pudo cargar la imagen.",
    demo_checkout_image_missing_body:
      "No se encontró una imagen válida para este código en el pago demo.",
    payment_label: "Pago",
    demo_checkout_title: "Completa la compra demo.",
    demo_checkout_body:
      "Esta pantalla de pago es solo para demostración. Cualquier tarjeta funciona, no se cobra nada y la imagen se desbloquea al instante.",
    card_name: "Nombre en la tarjeta",
    card_name_placeholder: "Max Mustermann",
    card_number: "Número de tarjeta",
    expiry: "Caducidad",
    cvc: "CVC",
    claim_code_dash: "Código claim",
    demo_buy_button: "Comprar ahora {price}",
    demo_processing: "Procesando pago...",
    demo_mode_note: "El modo demo está activo. Cualquier tarjeta desbloquea la imagen al instante.",
    demo_payment_failed: "El pago demo ha fallado.",
    demo_fill_payment_fields: "Completa todos los campos de la tarjeta para la demo.",
    success_missing_title: "No se encontró ningún desbloqueo.",
    success_missing_body:
      "Abre esta página desde la redirección de compra o checkout demo para cargar tu compra.",
    success_load_failed_title: "El pago se realizó, pero el desbloqueo aún no aparece.",
    success_load_failed_body: "No se pudo cargar el desbloqueo.",
    success_ready_title: "Tu imagen ya está disponible.",
    success_pending_title: "Se está comprobando el desbloqueo.",
    success_ready_body: "Ahora puedes guardar tu imagen o compartirla directamente con tus amigos.",
    success_pending_body: "El pago se está procesando. Desbloquearemos tu imagen justo después.",
    save_image: "Guardar imagen",
    save_preparing: "Preparando guardado...",
    share_image: "Compartir imagen",
    share_preparing: "Preparando compartir...",
    share_sheet_opened: "Se abrió compartir o guardar en fotos.",
    opened_new_tab: "Imagen abierta en una nueva pestaña.",
    download_started: "Descarga iniciada.",
    download_not_ready: "La imagen aún no está lista para descargar.",
    download_failed: "No se pudo cargar la imagen.",
    share_native_text: "Ahora puedes compartir la imagen o guardarla en fotos.",
    share_title: "Mi recuerdo",
    share_copied: "Enlace copiado.",
    share_not_available: "Compartir no está disponible en este dispositivo ahora mismo.",
    share_cancelled: "Se canceló el uso compartido.",
    demo_success_label: "Éxito Demo",
    demo_success_title: "Tu imagen ya está desbloqueada.",
    demo_success_body:
      "El pago demo se realizó correctamente. Ahora puedes guardar la imagen o compartirla directamente.",
    demo_success_disabled_title: "El éxito demo no está activo.",
    demo_success_disabled_body:
      "Configura ALLOW_MOCK_CHECKOUT=true para habilitar este desbloqueo de prueba.",
    demo_success_missing_code_title: "No se encontró ningún código.",
    demo_success_missing_code_body:
      "Abre esta página directamente desde el checkout demo para cargar la imagen.",
    demo_success_image_missing_title: "No se pudo cargar la imagen.",
    demo_success_image_missing_body:
      "No se encontró una imagen válida para este desbloqueo demo.",
  },
  it: {
    app_title: "Demo EasyTerminal",
    app_description:
      "Demo standalone dello schermo EasyTerminal con immagini scorrevoli, codici QR e popup introduttivo.",
    gallery_missing_supabase:
      "Mancano ancora le variabili d'ambiente di Supabase. Aggiungi NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
    gallery_load_error: "Impossibile caricare la galleria da Supabase.",
    gallery_load_failed: "Impossibile caricare la galleria.",
    gallery_no_images: "Nessuna immagine trovata.",
    gallery_skipped_images:
      "Sono state caricate {count} voci, ma senza un URL immagine valido. Controlla image_url, thumbnail_url o storage_path.",
    gallery_no_images_query: "La tabella photos non restituisce immagini per questa richiesta in questo momento.",
    gallery_headline: "Scansiona il codice QR e apri la tua immagine sul telefono",
    qr_scan_your: "Scansiona la tua",
    qr_image: "immagine",
    intro_hint: "Nota Demo",
    intro_title: "Scansiona con il QR code come farebbe un visitatore del parco.",
    intro_card_hint: "Per il test di pagamento usa la carta demo 4242 4242 4242 4242.",
    intro_card_details: "Scadenza: 12/27 CVC: 123 Qualsiasi nome va bene.",
    intro_continue: "Continua",
    claim_missing_code_title: "Nessun codice claim trovato.",
    claim_missing_code_body:
      "Apri il QR code direttamente dall'app fotocamera oppure controlla se il link contiene il parametro code.",
    claim_label: "Claim",
    claim_load_failed_title: "Impossibile caricare l'immagine in questo momento.",
    claim_not_found_title: "Non riusciamo a trovare questa immagine al momento.",
    claim_not_found_body:
      "Il codice è stato riconosciuto, ma non è stato possibile caricare una voce corrispondente da photos. Controlla il QR code oppure prova con un'immagine attuale dello schermo.",
    claim_code_label: "Codice",
    claim_memory: "Il tuo ricordo",
    claim_your_image: "La tua immagine",
    claim_title: "Conserva il tuo ricordo.",
    claim_demo_body:
      "Apri la tua immagine sul telefono, inserisci nome ed email e poi passa direttamente alla schermata di pagamento demo.",
    claim_stripe_body:
      "Apri la tua immagine sul telefono, inserisci nome ed email e poi passa direttamente al checkout sicuro.",
    claim_primary_button: "Salva questo ricordo",
    claim_name: "Nome",
    claim_email: "Email",
    claim_name_placeholder: "Nome Cognome",
    claim_email_placeholder: "tuo.nome@email.com",
    claim_name_required: "Inserisci il tuo nome.",
    claim_email_required: "Inserisci la tua email.",
    claim_email_invalid: "Inserisci un indirizzo email valido.",
    claim_checkout_loading: "Caricamento checkout...",
    claim_checkout_preparing: "Preparazione checkout...",
    claim_checkout_demo_button: "Vai al pagamento demo",
    claim_checkout_button: "Vai al checkout",
    claim_demo_note:
      "Il pagamento demo è attivo. Questa presentazione usa un proprio flusso claim e non modifica alcuna logica Stripe o Supabase esistente negli altri progetti.",
    claim_checkout_note:
      "Questo checkout usa un proprio flusso claim e non modifica alcuna logica Stripe o Supabase esistente negli altri progetti.",
    checkout_start_failed: "Impossibile avviare il checkout.",
    demo_checkout_disabled_title: "Il checkout demo non è attivo.",
    demo_checkout_disabled_body:
      "Imposta ALLOW_MOCK_CHECKOUT=true per rendere disponibile questa pagina di test.",
    demo_checkout_missing_code_title: "Nessun codice claim trovato.",
    demo_checkout_missing_code_body:
      "Apri questa pagina direttamente dal flusso claim per caricare il pagamento demo.",
    demo_checkout_image_missing_title: "Impossibile caricare l'immagine.",
    demo_checkout_image_missing_body:
      "Per questo codice non è stata trovata un'immagine valida per il pagamento demo.",
    payment_label: "Pagamento",
    demo_checkout_title: "Completa l'acquisto demo.",
    demo_checkout_body:
      "Questa schermata di pagamento è solo a scopo dimostrativo. Qualsiasi carta funziona, non viene addebitato nulla e l'immagine viene sbloccata subito.",
    card_name: "Nome sulla carta",
    card_name_placeholder: "Max Mustermann",
    card_number: "Numero di carta",
    expiry: "Data di scadenza",
    cvc: "CVC",
    claim_code_dash: "Codice claim",
    demo_buy_button: "Acquista ora {price}",
    demo_processing: "Elaborazione pagamento...",
    demo_mode_note: "La modalità demo è attiva. Qualsiasi carta inserita sblocca subito l'immagine.",
    demo_payment_failed: "Pagamento demo non riuscito.",
    demo_fill_payment_fields: "Compila tutti i campi della carta per la demo.",
    success_missing_title: "Nessuno sblocco trovato.",
    success_missing_body:
      "Apri questa pagina tramite il reindirizzamento dell'acquisto o del checkout demo per caricare il tuo acquisto.",
    success_load_failed_title: "Il pagamento è andato a buon fine, ma lo sblocco manca ancora.",
    success_load_failed_body: "Impossibile caricare lo sblocco.",
    success_ready_title: "La tua immagine è ora disponibile.",
    success_pending_title: "Controllo dello sblocco in corso.",
    success_ready_body: "Ora puoi salvare la tua immagine o condividerla direttamente con i tuoi amici.",
    success_pending_body: "Il pagamento è in elaborazione. Sbloccheremo l'immagine subito dopo.",
    save_image: "Salva immagine",
    save_preparing: "Preparazione salvataggio...",
    share_image: "Condividi immagine",
    share_preparing: "Preparazione condivisione...",
    share_sheet_opened: "Condivisione o salvataggio in foto aperto.",
    opened_new_tab: "Immagine aperta in una nuova scheda.",
    download_started: "Download avviato.",
    download_not_ready: "L'immagine non è ancora pronta per il download.",
    download_failed: "Impossibile caricare l'immagine.",
    share_native_text: "Ora puoi condividere l'immagine o salvarla nelle foto.",
    share_title: "Il mio ricordo",
    share_copied: "Link copiato.",
    share_not_available: "La condivisione non è disponibile su questo dispositivo in questo momento.",
    share_cancelled: "Condivisione annullata.",
    demo_success_label: "Successo Demo",
    demo_success_title: "La tua immagine è ora sbloccata.",
    demo_success_body:
      "Il pagamento demo è andato a buon fine. Ora puoi salvare l'immagine o condividerla direttamente.",
    demo_success_disabled_title: "Il successo demo non è attivo.",
    demo_success_disabled_body:
      "Imposta ALLOW_MOCK_CHECKOUT=true per rendere disponibile questo sblocco di prova.",
    demo_success_missing_code_title: "Nessun codice claim trovato.",
    demo_success_missing_code_body:
      "Apri questa pagina direttamente dal checkout demo per caricare l'immagine.",
    demo_success_image_missing_title: "Impossibile caricare l'immagine.",
    demo_success_image_missing_body:
      "Non è stata trovata un'immagine valida per questo sblocco demo.",
  },
  fr: {
    app_title: "Démo EasyTerminal",
    app_description:
      "Démo autonome de l'écran EasyTerminal avec images défilantes, QR codes et fenêtre d'introduction.",
    gallery_missing_supabase:
      "Les variables d'environnement Supabase sont encore manquantes. Ajoute NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local.",
    gallery_load_error: "Impossible de charger la galerie depuis Supabase.",
    gallery_load_failed: "Impossible de charger la galerie.",
    gallery_no_images: "Aucune image trouvée.",
    gallery_skipped_images:
      "{count} entrées ont été chargées mais sans URL d'image exploitable. Vérifie image_url, thumbnail_url ou storage_path.",
    gallery_no_images_query: "La table photos ne renvoie actuellement aucune image pour cette requête.",
    gallery_headline: "Scanne le QR code et ouvre ton image sur ton téléphone",
    qr_scan_your: "Scanne ton",
    qr_image: "image",
    intro_hint: "Info Démo",
    intro_title: "Scanne avec le QR code comme un visiteur du parc.",
    intro_card_hint:
      "Pour le test de paiement, utilise la carte démo 4242 4242 4242 4242.",
    intro_card_details: "Date d'expiration : 12/27 CVC : 123 N'importe quel nom fonctionne.",
    intro_continue: "Continuer",
    claim_missing_code_title: "Aucun code claim trouvé.",
    claim_missing_code_body:
      "Ouvre le QR code directement depuis l'appareil photo ou vérifie que le lien contient bien le paramètre code.",
    claim_label: "Claim",
    claim_load_failed_title: "L'image ne peut pas être chargée pour le moment.",
    claim_not_found_title: "Nous ne trouvons pas cette image pour le moment.",
    claim_not_found_body:
      "Le code a été reconnu, mais aucune entrée correspondante n'a pu être chargée depuis photos. Vérifie le QR code ou essaie avec une image récente de l'écran.",
    claim_code_label: "Code",
    claim_memory: "Ton souvenir",
    claim_your_image: "Ton image",
    claim_title: "Garde ton souvenir.",
    claim_demo_body:
      "Ouvre ton image sur ton téléphone, saisis ton nom et ton e-mail, puis passe directement à l'écran de paiement démo.",
    claim_stripe_body:
      "Ouvre ton image sur ton téléphone, saisis ton nom et ton e-mail, puis passe directement au checkout sécurisé.",
    claim_primary_button: "Enregistrer ce souvenir",
    claim_name: "Nom",
    claim_email: "E-mail",
    claim_name_placeholder: "Prénom Nom",
    claim_email_placeholder: "ton.nom@email.com",
    claim_name_required: "Merci d'indiquer ton nom.",
    claim_email_required: "Merci d'indiquer ton e-mail.",
    claim_email_invalid: "Merci d'indiquer une adresse e-mail valide.",
    claim_checkout_loading: "Chargement du checkout...",
    claim_checkout_preparing: "Préparation du checkout...",
    claim_checkout_demo_button: "Continuer vers le paiement démo",
    claim_checkout_button: "Continuer vers le checkout",
    claim_demo_note:
      "Le paiement démo est actif. Cette présentation utilise son propre parcours claim et ne modifie aucune logique Stripe ou Supabase existante dans les autres projets.",
    claim_checkout_note:
      "Ce checkout utilise son propre parcours claim et ne modifie aucune logique Stripe ou Supabase existante dans les autres projets.",
    checkout_start_failed: "Le checkout n'a pas pu être lancé.",
    demo_checkout_disabled_title: "Le checkout démo n'est pas actif.",
    demo_checkout_disabled_body:
      "Définis ALLOW_MOCK_CHECKOUT=true pour rendre cette page de test disponible.",
    demo_checkout_missing_code_title: "Aucun code claim trouvé.",
    demo_checkout_missing_code_body:
      "Ouvre cette page directement depuis le parcours claim pour charger le paiement démo.",
    demo_checkout_image_missing_title: "L'image n'a pas pu être chargée.",
    demo_checkout_image_missing_body:
      "Aucune image correspondante n'a été trouvée pour ce code dans le paiement démo.",
    payment_label: "Paiement",
    demo_checkout_title: "Finaliser l'achat démo.",
    demo_checkout_body:
      "Cet écran de paiement est uniquement destiné à la démonstration. N'importe quelle carte fonctionne, rien n'est débité et l'image est débloquée immédiatement.",
    card_name: "Nom sur la carte",
    card_name_placeholder: "Max Mustermann",
    card_number: "Numéro de carte",
    expiry: "Date d'expiration",
    cvc: "CVC",
    claim_code_dash: "Code claim",
    demo_buy_button: "Acheter maintenant {price}",
    demo_processing: "Paiement en cours...",
    demo_mode_note: "Le mode démo est actif. Toute carte saisie débloque l'image immédiatement.",
    demo_payment_failed: "Le paiement démo a échoué.",
    demo_fill_payment_fields: "Merci de remplir tous les champs de carte pour la démo.",
    success_missing_title: "Aucun déverrouillage trouvé.",
    success_missing_body:
      "Ouvre cette page via la redirection de l'achat ou du checkout démo pour charger ton achat.",
    success_load_failed_title: "Le paiement est passé, mais le déverrouillage manque encore.",
    success_load_failed_body: "Le déverrouillage n'a pas pu être chargé.",
    success_ready_title: "Ton image est maintenant disponible.",
    success_pending_title: "Le déverrouillage est en cours de vérification.",
    success_ready_body: "Tu peux maintenant enregistrer ton image ou la partager directement avec tes amis.",
    success_pending_body: "Le paiement est en cours de traitement. Nous débloquerons ton image juste après.",
    save_image: "Enregistrer l'image",
    save_preparing: "Préparation de l'enregistrement...",
    share_image: "Partager l'image",
    share_preparing: "Préparation du partage...",
    share_sheet_opened: "Partager ou enregistrer dans Photos ouvert.",
    opened_new_tab: "Image ouverte dans un nouvel onglet.",
    download_started: "Téléchargement lancé.",
    download_not_ready: "L'image n'est pas encore prête au téléchargement.",
    download_failed: "L'image n'a pas pu être chargée.",
    share_native_text: "Tu peux maintenant partager l'image ou l'enregistrer dans Photos.",
    share_title: "Mon souvenir",
    share_copied: "Lien copié.",
    share_not_available: "Le partage n'est pas disponible sur cet appareil pour le moment.",
    share_cancelled: "Le partage a été annulé.",
    demo_success_label: "Succès Démo",
    demo_success_title: "Ton image est maintenant déverrouillée.",
    demo_success_body:
      "Le paiement démo a réussi. Tu peux maintenant enregistrer l'image ou la partager directement.",
    demo_success_disabled_title: "Le succès démo n'est pas actif.",
    demo_success_disabled_body:
      "Définis ALLOW_MOCK_CHECKOUT=true pour rendre ce déverrouillage de test disponible.",
    demo_success_missing_code_title: "Aucun code claim trouvé.",
    demo_success_missing_code_body:
      "Ouvre cette page directement depuis le checkout démo pour charger l'image.",
    demo_success_image_missing_title: "L'image n'a pas pu être chargée.",
    demo_success_image_missing_body:
      "Aucune image correspondante n'a été trouvée pour ce déverrouillage démo.",
  },
  nl: {
    app_title: "EasyTerminal Demo",
    app_description:
      "Zelfstandige EasyTerminal-schermdemo met doorlopende afbeeldingen, QR-codes en een introductiepopup.",
    gallery_missing_supabase:
      "De Supabase-omgevingsvariabelen ontbreken nog. Voeg NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY toe in .env.local.",
    gallery_load_error: "De galerij kon niet vanuit Supabase worden geladen.",
    gallery_load_failed: "De galerij kon niet worden geladen.",
    gallery_no_images: "Geen afbeeldingen gevonden.",
    gallery_skipped_images:
      "{count} items zijn geladen, maar hadden geen bruikbare afbeeldings-URL. Controleer image_url, thumbnail_url of storage_path.",
    gallery_no_images_query: "De photos-tabel geeft op dit moment geen afbeeldingen terug voor deze query.",
    gallery_headline: "Scan de QR-code en open je afbeelding op je telefoon",
    qr_scan_your: "Scan je",
    qr_image: "afbeelding",
    intro_hint: "Demo-info",
    intro_title: "Scan met de QR-code zoals een parkbezoeker.",
    intro_card_hint: "Gebruik voor de betaaltest de demo-kaart 4242 4242 4242 4242.",
    intro_card_details: "Vervaldatum: 12/27 CVC: 123 Elke naam is goed.",
    intro_continue: "Doorgaan",
    claim_missing_code_title: "Geen claimcode gevonden.",
    claim_missing_code_body:
      "Open de QR-code direct vanuit de camera-app of controleer of de link een code-parameter bevat.",
    claim_label: "Claim",
    claim_load_failed_title: "De afbeelding kon nu niet worden geladen.",
    claim_not_found_title: "We konden deze afbeelding nu niet vinden.",
    claim_not_found_body:
      "De code is herkend, maar er kon geen passende invoer uit photos worden geladen. Controleer de QR-code of probeer een actuele afbeelding van het scherm.",
    claim_code_label: "Code",
    claim_memory: "Jouw herinnering",
    claim_your_image: "Jouw afbeelding",
    claim_title: "Bewaar je herinnering.",
    claim_demo_body:
      "Open je afbeelding op je telefoon, vul je naam en e-mail in en ga daarna direct door naar het demo-betaalscherm.",
    claim_stripe_body:
      "Open je afbeelding op je telefoon, vul je naam en e-mail in en ga daarna direct door naar de veilige checkout.",
    claim_primary_button: "Herinnering opslaan",
    claim_name: "Naam",
    claim_email: "E-mail",
    claim_name_placeholder: "Voornaam Achternaam",
    claim_email_placeholder: "jouw.naam@email.com",
    claim_name_required: "Vul je naam in.",
    claim_email_required: "Vul je e-mailadres in.",
    claim_email_invalid: "Vul een geldig e-mailadres in.",
    claim_checkout_loading: "Checkout laden...",
    claim_checkout_preparing: "Checkout voorbereiden...",
    claim_checkout_demo_button: "Doorgaan naar demo-betaling",
    claim_checkout_button: "Doorgaan naar checkout",
    claim_demo_note:
      "Demo-betaling is actief. Deze presentatie draait in een eigen claimflow en verandert geen bestaande Stripe- of Supabase-logica in andere projecten.",
    claim_checkout_note:
      "Deze checkout draait in een eigen claimflow en verandert geen bestaande Stripe- of Supabase-logica in andere projecten.",
    checkout_start_failed: "Checkout kon niet worden gestart.",
    demo_checkout_disabled_title: "Demo-checkout is niet actief.",
    demo_checkout_disabled_body:
      "Zet ALLOW_MOCK_CHECKOUT=true om deze testbetaalpagina beschikbaar te maken.",
    demo_checkout_missing_code_title: "Geen claimcode gevonden.",
    demo_checkout_missing_code_body:
      "Open deze pagina direct vanuit de claimflow zodat de demo-betaling kan worden geladen.",
    demo_checkout_image_missing_title: "Afbeelding kon niet worden geladen.",
    demo_checkout_image_missing_body:
      "Er is geen passende afbeelding gevonden voor deze code bij de demo-betaling.",
    payment_label: "Betaling",
    demo_checkout_title: "Demo-aankoop afronden.",
    demo_checkout_body:
      "Dit betaalscherm is alleen voor demonstratie. Elke kaart werkt, er wordt niets afgeschreven en de afbeelding wordt direct vrijgegeven.",
    card_name: "Naam op de kaart",
    card_name_placeholder: "Max Mustermann",
    card_number: "Kaartnummer",
    expiry: "Vervaldatum",
    cvc: "CVC",
    claim_code_dash: "Claimcode",
    demo_buy_button: "Nu kopen {price}",
    demo_processing: "Betaling verwerken...",
    demo_mode_note: "Demomodus is actief. Elke ingevoerde kaart geeft de afbeelding direct vrij.",
    demo_payment_failed: "Demo-betaling mislukt.",
    demo_fill_payment_fields: "Vul alle kaartvelden in voor de demo.",
    success_missing_title: "Geen vrijgave gevonden.",
    success_missing_body:
      "Open deze pagina via de aankoop- of demo-checkout-redirect zodat je aankoop kan worden geladen.",
    success_load_failed_title: "De betaling is gelukt, maar de vrijgave ontbreekt nog.",
    success_load_failed_body: "De vrijgave kon niet worden geladen.",
    success_ready_title: "Je afbeelding is nu beschikbaar.",
    success_pending_title: "Vrijgave wordt gecontroleerd.",
    success_ready_body: "Je kunt je afbeelding nu opslaan of direct met vrienden delen.",
    success_pending_body: "De betaling wordt verwerkt. Daarna geven we je afbeelding direct vrij.",
    save_image: "Afbeelding opslaan",
    save_preparing: "Opslaan voorbereiden...",
    share_image: "Afbeelding delen",
    share_preparing: "Delen voorbereiden...",
    share_sheet_opened: "Delen of opslaan in foto's geopend.",
    opened_new_tab: "Afbeelding geopend in een nieuw tabblad.",
    download_started: "Download gestart.",
    download_not_ready: "De afbeelding is nog niet klaar om te downloaden.",
    download_failed: "De afbeelding kon niet worden geladen.",
    share_native_text: "Je kunt de afbeelding nu delen of opslaan in foto's.",
    share_title: "Mijn herinnering",
    share_copied: "Link gekopieerd.",
    share_not_available: "Delen is op dit apparaat nu niet beschikbaar.",
    share_cancelled: "Delen is geannuleerd.",
    demo_success_label: "Demo Succes",
    demo_success_title: "Je afbeelding is nu vrijgegeven.",
    demo_success_body:
      "De demo-betaling is geslaagd. Je kunt de afbeelding nu opslaan of direct delen.",
    demo_success_disabled_title: "Demo-succes is niet actief.",
    demo_success_disabled_body:
      "Zet ALLOW_MOCK_CHECKOUT=true om deze testvrijgave beschikbaar te maken.",
    demo_success_missing_code_title: "Geen claimcode gevonden.",
    demo_success_missing_code_body:
      "Open deze pagina direct via de demo-checkout zodat de afbeelding kan worden geladen.",
    demo_success_image_missing_title: "Afbeelding kon niet worden geladen.",
    demo_success_image_missing_body:
      "Er is geen passende afbeelding gevonden voor deze demo-vrijgave.",
  },
};

export function getLocaleFromAcceptLanguage(value?: string | null): Locale {
  const normalized = value?.toLowerCase() ?? "";

  for (const locale of SUPPORTED_LOCALES) {
    if (normalized.includes(locale)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

export function formatLocaleString(
  locale: Locale,
  key: TranslationKey,
  values: Record<string, string | number> = {},
) {
  let template = translations[locale][key] ?? translations[DEFAULT_LOCALE][key] ?? key;

  for (const [name, value] of Object.entries(values)) {
    template = template.replaceAll(`{${name}}`, String(value));
  }

  return template;
}
