import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Col, Container, Row, Table } from "react-bootstrap";

import { FetchWeightsByUsernameOrderedByDateAsc } from "../hooks/FetchWeights";

import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const Weights = () => {
  const userDto = useSelector((state) => state.userDto);

  const [errMessage, setErrMessage] = useState("");
  const [weights, setWeights] = useState([]);

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

  return (
    <>
      <Container className="mt-4">
        {errMessage ? (
          errMessage
        ) : (
          <Row>
            <Col xs={6}>
              <Table striped bgcolor="white">
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Weight</td>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((w, i) => (
                    <tr key={"weight-" + i}>
                      <td>{w.date}</td>
                      <td>{w.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
