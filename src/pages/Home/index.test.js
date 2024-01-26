import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";
import Page from "./index";
import Form from "../../containers/Form";
import Events from '../../containers/Events/index'
import PeopleCard from "../../components/PeopleCard";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Form />);
    screen.getByText("Email");
    screen.getByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Form />);
      fireEvent(
        screen.getByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // await (screen.findByText("Message envoyé !"));
      await waitFor(() => screen.findAllByText("Message envoyé !"), { timeout: 3000 });
    });
  });

});

//jest.setTimeout(10000);
describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Events />);
    const eventsList = screen.getByTestId('events');
    expect(eventsList).toBeInTheDocument();
  })
  it("a list of people is displayed", async () => {
    render(<PeopleCard position="CEO" name="Samira" imageSrc="path_to_image" />)

    const name = await screen.findByText('Samira',);

    expect(name).toBeInTheDocument();
  });
  })
  it("displays a footer", async () => {
    render(<Home />);
    
    const footer = await screen.findByTestId('footer', {}, { timeout: 3500 });
    
    expect(footer).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
;
