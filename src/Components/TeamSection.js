import React from "react";
import edric from "../images/edric.jpeg";
import franko from "../images/franko.avif";
import bhuvia from "../images/bhuvia.avif";
import alexa from "../images/alexa.avif";
import { FcRating } from "react-icons/fc";
const TeamSection = () => {
  return (
    <section id="team">
      <div className="row text-center">
        <h3 className="text-warning fw-bolder pt-2">Reviews</h3>
        <p className="pb-2" style={{ fontSize: "19px" }}>
          Our recipe application's review section showcases the delight of our
          users. With genuine testimonials from passionate food enthusiasts,
          it's a testament to the quality and satisfaction our recipes provide.
          Explore the experiences of our diverse community, and join us in
          culinary excellence!
        </p>
        <div className="col-12 col-sm-12 col-lg-3 mb-3" id="reviewCard">
          <div className="card h-100 border-success">
            <div className="card-body">
              <div className="portfolio-img mx-5">
                <img
                  src={edric}
                  style={{ width: "100px" }}
                  className="img-fluid rounded-circle m-3"
                  alt="..."
                />
              </div>
              <h5 className="card-title text-success fw-bolder">Edric</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                quidem commodi iusto corrupti nobis reiciendis voluptatem enim,
                dolorem quo repudiandae omnis voluptate quisquam natus magnam?
              </p>
              <FcRating />
              <FcRating />
              <FcRating />
              <FcRating />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-lg-3 mb-4" id="reviewCard">
          <div className="card h-100 border-success">
            <div className="card-body">
              <div className="portfolio-img mx-5">
                <img
                  src={franko}
                  style={{ width: "100px" }}
                  className="img-fluid rounded-circle m-3"
                  alt="..."
                />
              </div>
              <h5 className="card-title text-success fw-bolder">Franko</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                ad exercitationem minus, quod sapiente ratione quibusdam aliquid
                quia cum nobis, officia dolorum vitae corrupti neque! Lorem
                ipsum dolor si
              </p>
              <FcRating />
              <FcRating />
              <FcRating />
              <FcRating />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-lg-3 mb-4" id="reviewCard">
          <div className="card h-100 border-success">
            <div className="card-body">
              <div className="portfolio-img mx-5">
                {" "}
                <img
                  src={alexa}
                  style={{ width: "100px" }}
                  className="img-fluid rounded-circle m-3"
                  alt="..."
                />
              </div>
              <h5 className="card-title text-success fw-bolder">Bhuvia</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                ab odio eius dolor aperiam minima. Dolore distinctio totam
                voluptatibus praesentium fugiat quisquam, quod officia
                voluptatem.
              </p>
              <FcRating />
              <FcRating />
              <FcRating />
              <FcRating />
              <FcRating />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-lg-3 mb-4" id="reviewCard">
          <div className="card h-100 border-success">
            <div className="card-body">
              <div className="portfolio-img mx-5">
                <img
                  src={bhuvia}
                  style={{ width: "100px" }}
                  className="img-fluid rounded-circle m-3"
                  alt="..."
                />
              </div>
              <h5 className="card-title text-success fw-bolder">Alexa</h5>
              <p className="card-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
                aliquam corporis repellat illum eius assumenda rem, quod
                aspernatur, optio laudantium dolor numquam iusto qui reiciendis.
              </p>
              <FcRating />
              <FcRating />
              <FcRating />
              <FcRating />
              <FcRating />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
