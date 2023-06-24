import React from "react"
import { render, screen } from "@testing-library/react";
import SignIn from "./SignIn"

test("on initial render, the signin button is disabled", () => {
  render{ <SignIn/> }
});
