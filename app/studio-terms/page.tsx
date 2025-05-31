import React from 'react';
import { Markdown } from '@/components/markdown';



export default function StudioTermsPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <Markdown>{studiotermsText}</Markdown>
    </main>
  );
} 


const studiotermsText = `
# EigenLayer Studio Terms of Use

**Last Revised: May 29th, 2025**

Please review these Terms of Use (“**Studio Terms**”) carefully, as they set forth the legally binding terms and conditions that govern your use of the EigenLayer Studio platform, including any associated software applications, tools, features and functionality (collectively, “**Studio Platform**"), as well as our website located at https://studio.eigenlayer.xyz (“**Studio Website**") (together, the "**Studio Services**") operated by or on behalf of Eigen Labs, Inc. (“**Company**,", "**we**" or "**us**"). These Studio Terms are supplemental to, and incorporate by reference, our general EigenLayer Terms of Service available at [https://docs.eigenlayer.xyz/eigenlayer/legal/terms-of-service](https://docs.eigenlayer.xyz/eigenlayer/legal/terms-of-service) (the "**General Terms**"), which also apply to the Studio Services. In the event of a conflict between the terms of these Studio Terms and the General Terms, these Studio Terms will supersede and control but only with respect to the Studio Services and only to the extent of such conflict. Capitalized terms used but not defined in these Studio Terms have the respective meanings set forth in the General Terms. The Studio Services will be considered part of the definition of "Services" for purposes of the General Terms. 

By entering into these Studio Terms or otherwise using the Studio Services, you agree to be bound by the Studio Terms as well as the General Terms.

**THE GENERAL TERMS CONTAIN AN ARBITRATION CLAUSE AND CLASS ACTION WAIVER, WHICH APPLY TO THE STUDIO SERVICES AND ANY DISPUTE ARISING OUT OF THESE STUDIO TERMS. YOU HAVE THE RIGHT TO OPT-OUT OF THE ARBITRATION CLAUSE AND THE CLASS ACTION WAIVER AS EXPLAINED IN THE GENERAL TERMS.**  
  
1. Description of the Services  
The Studio Platform is a platform designed to allow users to interact with third-party large language models ("**LLM**") to build a custom autonomous verifiable service ("**AVS**"). Specifically, users may use the Studio Platform to (i) refine an idea for an AVS ("**Idea**"); (ii) generate a design technology specification for an AVS ("**Tech Spec**"); (iii) generate a task list necessary for building an AVS design prototype ("**Task List**"); and (iv) generate code for the AVS based on the task list ("**AVS Code**"). Users may do so by submitting various text commands to the LLM ("**Input**") and receiving LLM-generated content, including an Idea, Tech Spec, Task List, or AVS Code (collectively, "**Output**") through the Studio Platform.

2. User Input  
You represent and warrant that you have all rights, consents, licenses, and permissions needed to submit and use (and allow us to use) your Input in and in connection with the Studio Platform, including for the purpose of generating Output. By submitting Input on the Studio Platform, you represent and warrant that: (i) the Input is yours and/or you have the right to use it and the right to grant us the rights and license as provided in these Studio Terms and the General Terms, and (ii) that the posting or use of your Input on or through the Studio Platform does not violate any applicable law or the privacy rights, publicity rights, copyrights, contract rights, intellectual property rights or any other rights of any person or entity. We reserve the right to terminate or suspend your use of the Studio Services if you are in breach of these Studio Terms, including if we suspect that you are using Inputs that you do not have the necessary rights to or otherwise violate any third party's intellectual property right.

3. Prohibited Activity  
You may not use the Studio Services to engage in the categories of activity set forth below ("**Prohibited Uses**"). The specific activities set forth below are representative, but not exhaustive, of Prohibited Uses. If you are uncertain as to whether your use of the Studio Services involves a Prohibited Use or have other questions about how these requirements apply to you, then please contact us at [notices@eigenlabs.org](mailto:notices@eigenlabs.org). By using the Studio Services, you confirm that you will not use the Studio Services to do any of the following:
  
    * generate or design an AVS that enables or facilitates illegal activity, violations of applicable law, fraudulent behavior, manipulation of data or cryptocurrency markets;  
    * submit Input that (i) infringes or violate any third-party's intellectual property or other rights; (ii) is prohibited under law; (iii) introduce any viruses, trojan horses, worms, logic bombs or other materials that are malicious or technologically harmful into our systems; (iv) poses or creates a security risk; or (v) which may expose us or our users to any harm or liability;  
    * use the Studio Platform in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying the Studio Platform, or that could damage, disable, overburden, or impair the functioning of the Studio Platform in any manner;  
    * frame, replicate, or develop an interface to access the Studio Platform without going directly to the Studio Website;  
    * circumvent any content-filtering techniques, security measures, rate limits or access controls that Company employs on the Studio Platform, including, without limitation, through the use of a VPN;  
    * circumvent, interfere with or disrupt our Studio Platform, including circumvent any quotas or restrictions or bypass any protective measures or safety mitigations we put on our Studio Platform;  
    * use any method to extract data, such as web scraping or web harvesting, from the Studio Platform;  
    * use any robot, spider, crawler, scraper, or other automated means or interface not provided by us, to access the Studio Platform or to extract data, or introduce any malware, virus, Trojan horse, worm, logic bomb, drop-dead device, backdoor, shutdown mechanism or other harmful material into the Studio Platform;  
    * use or distribute any Output in a misleading way, including, for instance, by representing that the Output is entirely human generated or suggesting your Output was created by or otherwise associated with an individual or organization who was not the creator of such Output;   
    * use the Studio Platform or any Output in violation of any applicable law, including any laws and regulations concerning the use or development of AI-generated content;  
    * use the Studio Platform or any applicable LLMs for a "high-risk use" as defined under applicable law (such as the EU AI Act or Colorado AI Act); or  
    * use the Studio Platform in violation of the applicable third-party LLM providers terms of use, acceptable use policy or other policies (which may include, for example, prohibitions on the use of such LLMs to develop or train a competing AI model).  
      
4. Use of Studio Services  
As a condition to accessing or using the Studio Services, you acknowledge, understand, and agree to the following:
  
    * from time to time, any part of the Studio Services may be inaccessible or inoperable for any reason, including, without limitation: (a) equipment malfunctions; (b) periodic maintenance procedures or repairs that Company or any of its suppliers or contractors may undertake from time to time; (c) disruptions and temporary unavailability of underlying LLM; or (d) unavailability of third-party service providers or external partners for any reason.  
    * we reserve the right to disable or modify access any part of the Studio Service at any time, including in the event of any breach of these Studio Terms, and we will not be liable to you for any losses or damages you may suffer as a result of or in connection with the Studio Service being inaccessible to you at any time or for any reason;  
    * we have no control over, or liability for, the delivery, quality, safety, legality, or any other aspect of any Output displayed on the Studio Platform.  
      
5. Quotas and Limits    
Your ability to interact with the Studio Platform may be limited after your use has reached excessive amounts, to be determined by Company in its own discretion. These limits are automatically enforced and may be updated from time to time without notice to you.
  
6. Intellectual Property Rights  
Your Inputs and Outputs shall be considered "Your Content" as defined and described in the General Terms. As between us and you, we do not claim any ownership in your Inputs or any Output generated by you in response to the submission of your Input to the Studio Platform; provided that we or our affiliates or licensors own and will continue to own the Studio Services and any and all other software or technology that was used to generate any Output. You acknowledge and agree that we may use your Input and Output to train or otherwise improve our Services, including our artificial intelligence and machine learning models related to the Studio Platform. You may use your Output for commercial purposes. Before utilizing your Output for commercial purposes, you should carefully review your Output and what permissions you may need from third parties to do so. We expressly disclaim any liability arising from your use of any Output for a commercial purpose.    
  
7. Third-Party Services  
The third-party LLMs Studio Platform made available on the Studio Platform will be considered "Third-Party Services" for purposes of the General Terms. We do not control third-party LLMs, or the content or services available from or generated by such LLMs. Your use of such third-party LLMs may be subject to additional terms and policies, which you agree to comply with. The current list of third-party LLMs integrated or otherwise made available through the Studio Platform is available at [INSERT URL]. 
  
8. Accuracy of Information  
Studio Platform merely displays Output generated by the chosen LLM. The LLMs integrated with the Studio Services are trained on data and content that may be inaccurate, biased, unverified, or potentially harmful.  Despite the efforts of the LLM provider, the information generated or displayed by the Studio Platform may contain errors or design flaws, be inaccurate, incomplete or out of date. Your use of the Studio Platform and any Output is at your own risk and discretion. Neither we nor any applicable LLM provider makes any representations, promises, or guarantees of any kind regarding any user's Outputs (including as to the completeness, accuracy or correctness of any Output displayed on the Studio Platform), and we hereby disclaim any and all responsibility and liability to you arising in connection with your use of any Output. You should review any Output therefrom for accuracy, trustworthiness, and accountability to support AI safety and mitigate the risk of unintended or unexpected functionality or risks of intellectual property infringement, bugs, or disclosure of proprietary information. No Output should be relied upon for or as a substitute for professional advice. 
  
9. Disclaimers      
        
    a. Company does not endorse, own or control any AVS that is deployed pursuant to any AVS Code generated by the underlying LLM and displayed on the Studio Platform ("**Deployed AVS**"). Please review the AVS Code carefully. We are not responsible for any losses or damages sustained by your use or deployment of a Deployed AVS and we make no representations, promises, or guarantees of any kind regarding a Deployed AVS (including as to its legality, accuracy, completeness, functionality, security, or availability or appropriateness for any particular purpose).  You are responsible for complying with all applicable laws relating to your use or deployment of any Deployed AVS.  
    b. Studio Platform allows users to interact with LLMs through an interface and does not connect to any blockchain network. In order to deploy an AVS using the AVS Code generated by the LLM, you must access the Ethereum blockchain via a third-party application. When you wish to interact with the Ethereum blockchain, you must create and broadcast, on your own account, a message to the Ethereum network through a separate third-party application. We do not control such third-party applications, and we hereby disclaim all responsibility and liability to you arising from any messages broadcasted to the Ethereum network through a third-party application.  
    c. You acknowledge that the Studio Platform and underlying LLMs are subject to flaws and that you are solely responsible for evaluating any Output generated by the LLM. No representation is made as to the legality, accuracy, completeness, functionality, security, availability or appropriateness for any particular purpose of any Output generated by the LLMs. Accordingly, you should review and verify all information, including AVS Code generated by the LLM, before relying on it or deploying the code on the Ethereum blockchain, and all decisions based on any Output displayed on the Studio Platform are your sole responsibility.   
    d. Due to the nature of artificial intelligence and machine learning, your Output may not be unique and the Studio Platform may generate the same or similar output for a third party. Other users may provide similar input to the Studio Platform and receive the same output from the Studio Platform. An input that is submitted by other users is not your Input (even if it is identical to the Input you submit to the Studio Platform), and an output that is requested by and generated for other users is not your Output.   
    e. WE TAKE NO RESPONSIBILITY AND ASSUME NO LIABILITY FOR ANY CONTENT THAT YOU, ANOTHER USER OR A THIRD PARTY CREATES, UPLOADS, POSTS, SENDS, RECEIVES OR STORES ON OR THROUGH OUR SERVICES, INCLUDING ANY OUTPUT.  
    f. You understand that the Studio Platform remains under development, which creates technological, security, and other risks when using or accessing the Studio Platform. These risks include, among others, errors, design flaws, bugs or vulnerabilities in code or an incorrect display of information on the Studio Platform.   
   
YOU UNDERSTAND AND ACKNOWLEDGE THAT COMPANY DOES NOT CONTROL OR OPERATE ANY LLM OR DEPLOYED AVS. YOU ACCEPT ALL CONSEQUENCES OF USING OUTPUT OR DEPLOYED AVS, INCLUDING THE RISK THAT AVS CODE GENERATED BY THE LLM MAY CONTAIN BUGS, VULNERABILITIES, OR INACCURATE INFORMATION OR INFRINGE ANY THIRD PARTY'S RIGHTS.  
  
10. Indemnification  
In addition to your indemnification obligations in the General Terms, you agree to indemnify, defend, and hold the Company Entities harmless from and against any and all claims, costs, damages, losses, liabilities and expenses (including attorneys' fees and costs) incurred by the Company Entities arising out of or in connection with (a) your violation or breach of these Studio Terms or any applicable law or regulation; (b) your violation of any rights of any third party, including through generation or use of any Output; (c) your use of any Deployed AVS; or (d) your Input or use of your Output. For clarity, we do not provide any indemnity to you for your Input or Output or the Studio Platform. 
  
11. Miscellaneous  
We may modify these Studio Terms from time to time, in which case, we will update the "Last Revised" date at the top of these Studio Terms. The updated Studio Terms will be effective as of the time of posting, or such later date as may be specified in the updated Studio Terms. Your continued access or use of the Studio Services after the modifications have become effective will be deemed your acceptance of the modified Studio Terms.

# LLM Disclosure

The Studio Platform is powered by the following LLMs. Please see their policies for more information:

- [OpenAI Policies](https://openai.com/policies/)
`;