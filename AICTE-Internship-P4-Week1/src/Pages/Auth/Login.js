import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI } from "../../utils/ApiRequest";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/"); // Redirect to Dashboard if already logged in
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = values;
      const { data } = await axios.post(loginAPI, { email, password });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/"); // Redirect to dashboard
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#1e1e1e", minHeight: "100vh", paddingTop: "50px" }}>
      <Container className="mt-5" style={{ position: "relative", zIndex: "2" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="p-4" style={{ backgroundColor: "#252525", borderRadius: "10px" }}>
            <h1 className="text-center mt-3">
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "#ff9800" }} className="text-center" />
            </h1>
            <h2 className="text-center" style={{ color: "#ff9800" }}>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label style={{ color: "#ffcc80" }}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  required
                  style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #ff9800" }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label style={{ color: "#ffcc80" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  required
                  style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #ff9800" }}
                />
              </Form.Group>

              <div className="mt-4 d-flex flex-column align-items-center">
                <Link to="/forgotPassword" style={{ color: "#ff9800", textDecoration: "none" }}>Forgot Password?</Link>

                <Button
                  type="submit"
                  className="mt-3"
                  style={{
                    backgroundColor: "#ff9800",
                    borderColor: "#ff9800",
                    padding: "10px 20px",
                    fontSize: "16px",
                  }}
                  disabled={loading}
                >
                  {loading ? "Signing in…" : "Login"}
                </Button>

                <p className="mt-3" style={{ color: "#ffcc80" }}>
                  Don't have an account? <Link to="/register" style={{ color: "#ff9800", textDecoration: "none" }}>Register</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
