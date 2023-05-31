import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  FetchWeightsByUsernameOrderedByDateAsc,
} from "../hooks/FetchWeights";

import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const Weights = () => {
  const userDto = useSelector((state) => state.userDto);

  const [errMessage, setErrMessage] = useState("");
  const [weights, setWeights] = useState([]);

  const [date, setDate] = useState("");
  const [weightKg, setWeightKg] = useState(0);
  const [valid, setValid] = useState(true);

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

  useEffect(() => {
    console.log(userDto);
    retriveData();
  }, []);

  const addWeight = async () => {
    if (date && weightKg) {
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
            <Col xs={6}>
              <Table striped bgcolor="white" className="text-center">
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Weight</td>
                  </tr>
                </thead>
                <tbody>
                  {weights.length > 0 ? (
                    weights.map((w, i) => (
                      <tr key={"weight-" + i}>
                        <td>{w.date}</td>
                        <td>{w.weight}</td>
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
                        value={date}
                        required
                      />
                    </td>
                    <td className="d-flex justify-content-between">
                      {" "}
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
                        max="300"
                      />
                      <Button variant="success" onClick={addWeight}>
                        +
                      </Button>
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
            <Col xs={6}>
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
