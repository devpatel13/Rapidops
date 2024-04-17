import React, { Component } from "react";
import "./style.css";
// import Table from "react-bootstrap/Table";

export class TableComponenet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: new Map(),
      newInput: this.props.fullName,
    };
  }

  render() {
    return (
      <table className="d-flex flex-column gap-3 container text-center w-50">
        <tbody>
          {this.state.names.map((fullName, index) => (
            <tr className="row justify-content-around column-gap-3" key={index}>
              <td className="col d-flex border border-secondary text-bg-light p-1 justify-content-start">
                {fullName[0]}
              </td>
              <td className="col d-flex border border-secondary text-bg-light p-1 justify-content-start">
                {fullName[1]}
              </td>
              <td className="col-2 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-info me-1 btn-sm px-3 edit"
                >
                  Edit
                </button>
                <button type="button" className="btn btn-danger btn-sm delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TableComponenet;
