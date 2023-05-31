import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";

import {
  AddWeightForUsername,
  DeleteWeightById,
  FetchWeightsByUsernameOrderedByDateAsc,
} from "../hooks/FetchWeights";

import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const Weights = () => {
  const userDto = useSelector((state) => state.userDto);

  const [errMessage, setErrMessage] = useState("");
  const [weights, setWeights] = useState([]);

  const [date, setDate] = useState(new Date());
  const [weightKg, setWeightKg] = useState(0);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    console.log(userDto);
    retriveData();
  }, []);

  const retriveData = async () => {
    const data = await FetchWeightsByUsernameOrderedByDateAsc(userDto.username);
    if (data) {
      if (data.errMessage) {
        setErrMessage(data.errMessage);
      } else {
        setWeights(data);
        console.log(weights);
      }
    } else setErrMessage("Server error");
  };

  const addWeight = async () => {
    if (date && weightKg && weightKg >= 30 && weightKg <= 250) {
      const res = await AddWeightForUsername(userDto.username, {
        date: date,
        weight: weightKg,
      });
      if (!res || res.errMessage) {
        showAlert(errMessage);
      } else {
        retriveData();
      }
    } else {
      showAlert();
    }
  };
  const deleteWeight = async (id) => {
    const res = await DeleteWeightById(id);
    if (!res || res.errMessage) {
      showAlert(errMessage);
    } else {
      retriveData();
    }
  };

  const showAlert = () => {
    setValid(false);
  };
  return (
    <>
      <Container className="mt-4">
        {errMessage ? (
          <Alert variant="danger">{errMessage}</Alert>
        ) : (
          <Row>
            <Col xs={12} md={6}>
              <Table striped bgcolor="white" className="text-center">
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Weight</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {weights.length > 0 ? (
                    weights.map((w, i) => (
                      <tr key={"weight-" + i}>
                        <td>{new Date(w.date).toLocaleDateString()}</td>
                        <td>{w.weight}</td>
                        <td>
                          <FiTrash2
                            className="fs-4 text-danger"
                            cursor={"pointer"}
                            onClick={() => deleteWeight(w.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No data, add some measurements</td>
                      <td></td>
                    </tr>
                  )}

                  <tr>
                    <td>
                      <input
                        type="date"
                        id="date"
                        autoComplete="off"
                        onChange={(e) => {
                          setDate(e.target.value);
                          setValid(true);
                        }}
                        max={new Date().toISOString().slice(0, 10)}
                        value={date}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        id="weightKg"
                        autoComplete="off"
                        onChange={(e) => {
                          setWeightKg(e.target.value);
                          setValid(true);
                        }}
                        value={weightKg}
                        required
                        step="0.01"
                        min="30"
                        max="250"
                      />
                    </td>
                    <td>
                      <FaRegPlusSquare
                        className="fs-4 text-success"
                        cursor={"pointer"}
                        onClick={addWeight}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              {!valid ? (
                <Alert variant="danger">Date or weight not valid</Alert>
              ) : (
                ""
              )}
            </Col>
            <Col xs={12} md={6}>
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
                color={"green"}
                animate={{
                  duration: 500,
                }}
              >
                <VictoryLine
                  data={weights}
                  // interpolation="natural"
                  domain={{ y: [0, 250] }}
                  // data accessor for x values
                  x="date"
                  // data accessor for y values
                  y="weight"
                  style={{
                    data: { stroke: "green", strokeWidth: 4 },
                  }}
                />
              </VictoryChart>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Weights;
