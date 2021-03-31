// import React from "react";
import { Machine, assign } from "xstate";

// export const GameMachine = React.createContext();

export const machine = Machine({
  //   type: "parallel",
  initial: "dark",
  context: {
    theme: "dark"
  },
  states: {
    dark: {
      on: {
        toggle: "light"
      }
    },
    light: {
      on: {
        toggle: "dark"
      }
    }
  }
  /* states: {
    theme: {
      id: "theme",
      initial: "dark",
      states: {
        dark: {
          on: {
            toggle: {
              target: "light",
              exit: assign({ theme: "light" })
            }
          }
        },
        light: {
          on: {
            toggle: {
              target: "dark",
              exit: assign({ theme: "dark" })
            }
          }
        }
      }
    }
  } */
});

export default machine;
