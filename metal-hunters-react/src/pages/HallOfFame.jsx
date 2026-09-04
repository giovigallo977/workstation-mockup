import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import { useToast } from "../context/ToastContext";

const PHOTOS = [
  { src: "assets/hero-spray-silhouette.jpg", alt: "Writer silhouette spraying a wall at night above the city skyline", label: "Wall Session", user: "kayo_tfp" },
  { src: "assets/hero-train-bombing.jpg", alt: "Writer bombing a train at night", label: "Piece Wall", user: "nixe_one" },
  { src: "assets/graphic-chainlink.jpg", alt: "Chain-link fence backlit", label: "Fresh Coat", user: "ruffa_crew" },
  { src: "assets/lookbook-firescape.jpg", alt: "Graffiti on a building with a fire escape", label: "Alley Bomb", user: "dez_wons" },
  { src: "assets/graphic-powerlines.jpg", alt: "Utility pole poster graphic", label: "Tunnel Run", user: "mira_blek" },
  { src: "assets/crew-01.jpg", alt: "Writer jumping onto a train car", label: "Night Block", user: "toka_sbs" },
  { src: "assets/crew-02.jpg", alt: "Writer crouched filming the action", label: "Concrete Jam", user: "spade_uno" },
  { src: "assets/crew-03.jpg", alt: "Writer sitting on the steps with a spray can", label: "Colour Riot", user: "blende_tag" },
];

export default function HallOfFame() {
  useEffect(() => { document.title = "Hall of Fame — Metal Hunters"; }, []);
  const showToast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    showToast("Thanks for your contribution!");
    formRef.current?.reset();
  }

  return (
    <>
      <Navbar />
      <PageHeader eyebrow="The Crew" title="Hall of Fame">
        Every writer who wears Metal Hunters enters our gallery. Walls, trains, rooftops: this is where the memory of the street lives on.
      </PageHeader>

      <section className="mh-section">
        <div className="container-fluid px-lg-5">
          <div className="row g-3">
            {PHOTOS.map((p, i) => (
              <div className="col-6 col-md-4 col-lg-3" key={i}>
                <div className="hof-frame">
                  <Photo src={p.src} alt={p.alt} fallbackLabel={p.label} />
                  <div className="hof-user">Uploaded by <strong>@{p.user}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mh-section bg-mh-black text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <p className="eyebrow mb-2">Get In The Gallery</p>
              <h2 className="mh-section-title mb-4">Upload Your Shot</h2>
              <p className="text-grey mb-5">Wearing Metal Hunters on a wall, a train or a rooftop? Send us the shot: the best ones make it into the Hall of Fame.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <form ref={formRef} className="upload-box" style={{ background: "rgba(242,241,234,.06)", borderColor: "rgba(242,241,234,.35)" }} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-white" htmlFor="hofUsername">Username / Writer Name</label>
                  <input type="text" className="form-control" id="hofUsername" placeholder="@yourname" required />
                </div>
                <div className="mb-4">
                  <label className="form-label text-white" htmlFor="hofFile">Choose a photo</label>
                  <input type="file" className="form-control" id="hofFile" accept="image/*" required />
                </div>
                <button type="submit" className="btn-mh-light w-100">Upload</button>
                {submitted && (
                  <div className="alert alert-light text-dark mt-4" role="alert">
                    Thanks for your contribution! Your shot is in the queue for the crew's review.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
