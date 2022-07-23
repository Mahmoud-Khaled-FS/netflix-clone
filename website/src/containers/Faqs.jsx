import React, { useState } from 'react';
import Accordin from '../components/accordin/Accordin';
import GsForm from '../components/gsForm/GsForm';
import faqsData from './../fixtures/faqs.json';
import GetStartedContainer from './GetStarted';
function FaqsContainer() {
  const [openFaqs, setOpenFaqs] = useState(null);
  return (
    <Accordin>
      <Accordin.Title>Frequently Asked Questions</Accordin.Title>
      {faqsData.map((item) => (
        <Accordin.Item onOpen={setOpenFaqs} openFaqs={openFaqs} id={item.id} key={item.id} header={item.header}>
          {item.body}
        </Accordin.Item>
      ))}
      {/* <GsForm>
        <GsForm.Title>Ready to watch? Enter your email to create or restart your membership.</GsForm.Title>
        <GsForm.Form>
          <GsForm.Input id="email" label="Email address" type="email" />
          <GsForm.Button>Get Started</GsForm.Button>
        </GsForm.Form>
      </GsForm> */}
      <GetStartedContainer />
    </Accordin>
  );
}

export default FaqsContainer;
