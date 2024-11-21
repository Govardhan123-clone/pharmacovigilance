"use client"; // Only add this line if you're using the `app` directory in Next.js 13 or later

import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>About Pharmacovigilance Application</h1>
      
      <p>
        Welcome to our Pharmacovigilance Application! Our platform is dedicated to 
        monitoring the safety of medications and ensuring the well-being of patients. 
        This application empowers healthcare professionals, patients, and researchers 
        to report and track adverse drug reactions, enhancing drug safety for all.
      </p>
      
      <h2>What is Pharmacovigilance?</h2>
      
      <p>
        Pharmacovigilance is the science and activities related to detecting, 
        assessing, understanding, and preventing adverse effects or any other 
        drug-related issues. It plays a vital role in ensuring the safety of 
        medications throughout their lifecycle, from clinical trials to 
        post-market monitoring.
      </p>
      
      <h2>Purpose of This Application</h2>
      
      <p>
        Our platform provides a collaborative space for sharing information on 
        drug safety and side effects. Users can report adverse drug reactions, 
        access detailed drug information, and receive timely updates on drug safety. 
        Our main objectives include:
      </p>
      
      <ul>
        <li>Empowering users to report adverse drug effects easily and securely.</li>
        <li>Providing healthcare professionals with a comprehensive database of 
        drug safety information.</li>
        <li>Ensuring timely communication of drug-related risks to users and patients.</li>
      </ul>
      
      <h2>Key Features</h2>
      
      <p>Our pharmacovigilance application includes the following key features:</p>
      
      <ul>
        <li><strong>Drug Safety Database:</strong> Access information about various drugs, 
        including potential side effects, usage instructions, and user reports.</li>
        <li><strong>Adverse Event Reporting:</strong> Submit and track reports on adverse 
        effects experienced from specific medications.</li>
        <li><strong>Notifications:</strong> Receive alerts for safety updates on 
        medications you’re interested in or have reported on.</li>
        <li><strong>Community Q&A:</strong> Ask and answer questions related to drug 
        interactions, effects, and safety measures.</li>
      </ul>
      
      <h2>Our Commitment to Safety</h2>
      
      <p>
        We are committed to providing a secure and accessible platform that facilitates 
        open communication on drug safety. By empowering users to report adverse reactions 
        and share their experiences, we contribute to the safety of medications for all.
      </p>
      
      <p>Thank you for using our Pharmacovigilance Application. Together, we can make medication use safer for everyone.</p>
    </div>
  );
};

export default AboutPage;
