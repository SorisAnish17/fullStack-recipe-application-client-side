import { useEffect } from "react";
import { useUserContext } from "../Context/UserInfo";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaClock, FaYoutube, FaGlassMartiniAlt } from "react-icons/fa";
import cookie from "../images/cookie.png";
import axios from "axios";
import Slider from "./Slider";
import Caurosel from "./Caurosel";
import TeamSection from "./TeamSection";
import google from "../images/play-store.png";
import app from "../images/app-store.png";
const Home = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { userId, setUserId, profilePic, setProfilePic, setUserDetail } =
    useUserContext();

  useEffect(() => {
    axios
      .get(`https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/user/${id}`)
      .then((response) => {
        if (response.data.data) {
          setUserDetail(response.data.data);
          setUserId(response.data.data._id);
          setProfilePic(response.data.data.profilePicture);
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <Slider />
      <div className="p-3 mt-5" id="cookies">
        <div className="m-5 d-md-flex justify-content-center">
          <img src={cookie} width={"325px"} className="img-responsive" />
          <div className="w-100">
            <h2>Oat Raisin Cookies</h2>
            <p style={{ fontSize: "20px", color: "#BD1E51" }} className="mt-5 ">
              Oat Raisin Cookies are a delicious and classic type of cookie that
              combines the wholesome flavors of oats and sweet raisins. These
              cookies are a popular choice for many due to their chewy texture,
              warm spices, and the natural sweetness of raisins.
            </p>
            <FaHeart className="mx-3" />
            5670
            <FaClock className="mx-3" />
            35 Min
            <a
              href="https://www.youtube.com/watch?v=HNB1b5mod1g"
              className="text-decoration-none text-danger"
            >
              <FaYoutube className="mx-3" />
              Play video{" "}
            </a>
          </div>
        </div>
      </div>
      <div>
        <Caurosel id={userId} />
      </div>
      <div>
        <TeamSection />
      </div>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download Our App</h3>
              <p>Download App for Android and IOS Mobile Phone</p>
              <div className="app-logo">
                <img src={google} alt="Play Store" />
                <img src={app} alt="App Store" />
              </div>
            </div>
            <div className="footer-col-2">
              <h4>
                Foodie<span className="text-warning">Fusion</span>
                <FaGlassMartiniAlt className="text-warning" />
              </h4>
              <p>
                Delicious Cooking is all about preparing mouthwatering dishes in
                a way that celebrates fresh, sustainable ingredients and caters
                to the taste buds of today's food enthusiasts
              </p>
            </div>
            <div className="footer-col-3">
              <h3 className="ms-4">Useful Links</h3>
              <ul>
                <li>Coupons</li>
                <li>Blog Plus</li>
                <li>Return policy</li>
                <li>Join Affiliate</li>
              </ul>
            </div>
            <div className="footer-col-4">
              <h3 className="ms-4">Follow Us</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Youtube</li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <p className="copyright">Copyright 2023-Soris Anish</p>
      </div>
    </div>
  );
};

export default Home;
