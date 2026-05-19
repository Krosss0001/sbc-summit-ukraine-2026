import Link from "next/link";

export default function ContactsPage() {
  return (
    <main className="form-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="legal-page mx-auto max-w-3xl">
        <Link href="/" className="nav-link text-[var(--color-accent)]">
          Назад до події
        </Link>
        <div className="glass-panel mt-8 rounded-lg p-6 sm:p-10">
          <p className="eyebrow">Контакти</p>
          <h1>RAVEERA GROUP</h1>
          <div className="legal-copy">
            <p>
              Організатор події: ФОП Чекан Богдан Орестович, RAVEERA GROUP.
            </p>
            <p>
              РНОКПП / ІПН: 3411613291. Єдиний податок: 2 група, ставка 20%.
              КВЕД: 90.01 Театральна та концертна діяльність.
            </p>
            <p>
              Адреса реєстрації: Україна, 03022, місто Київ, вул. Здановської
              Юлії, будинок 49, корпус 10, квартира 306.
            </p>
            <p>Територія діяльності: територія України.</p>
          </div>
          <div className="legal-list mt-8">
            <div>
              <span>Email</span>
              <strong>citointruesgmail.com</strong>
            </div>
            <div>
              <span>Телефон</span>
              <strong>+38 (093) 430-75-51</strong>
            </div>
            <div>
              <span>Telegram</span>
              <strong>bogdan_chekan</strong>
            </div>
            <div>
              <span>Години підтримки</span>
              <strong>10:00-19:00, понеділок-п&apos;ятниця</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
