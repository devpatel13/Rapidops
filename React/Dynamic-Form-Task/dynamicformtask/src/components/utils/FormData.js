const formData = {
  steps: [
    {
      step: "step1",

      title: "Step 1: Personal Information",

      description: "Please provide your personal information.",
    },

    {
      step: "step2",

      title: "Step 2: Additional Information",

      description: "Please provide additional information about yourself.",
    },

    {
      step: "step3",

      title: "Step 3: Preferences",

      description: "Please select your preferences.",
    },

    {
      step: "step4",

      title: "Step 4: Contact Information",

      description: "Please provide your contact information.",
    },

    {
      step: "step5",

      title: "Step 5: Payment Details",

      description: "Please provide your payment details.",
    },

    {
      step: "step6",

      title: "Step 6: Confirmation",

      description: "Please review and confirm your details.",
    },

    {
      step: "step7",

      title: "Step 7: Submission",

      description: "Please submit your form.",
    },
  ],

  fields: {
    step1: [
      {
        name: "firstName",

        label: "First Name",

        field_type: "text",

        default_value: "John",

        placeholder: "Enter First Name",

        validation: true,
      },

      {
        name: "lastName",

        label: "Last Name",

        field_type: "text",

        default_value: "Doe",

        placeholder: "Enter Last Name",

        validation: true,
      },
    ],

    step2: [
      {
        name: "userBio",

        label: "User Bio",

        field_type: "textarea",

        default_value: "",

        placeholder: "Enter User Bio",

        validation: true,
      },
    ],

    step3: [
      {
        name: "gender",

        label: "Gender",

        field_type: "radio",

        options: ["Male", "Female", "Other"],

        default_value: "Male",

        validation: true,
      },

      {
        name: "interests",

        label: "Interests",

        field_type: "checkbox",

        options: ["Sports", "Music", "Travel"],

        default_value: [],

        validation: false,
      },
    ],

    step4: [
      {
        name: "email",

        label: "Email",

        field_type: "email",

        default_value: "",

        placeholder: "Enter Email",

        validation: true,
      },

      {
        name: "phone",

        label: "Phone Number",

        field_type: "number",

        default_value: "",

        placeholder: "Enter Phone Number",

        validation: true,
      },
    ],

    step5: [
      {
        name: "paymentMethod",

        label: "Payment Method",

        field_type: "select",

        options: ["Credit Card", "PayPal", "Bank Transfer"],

        default_value: "Credit Card",

        placeholder: "Select Payment Method",

        validation: true,
      },
    ],

    step6: [
      {
        name: "termsAgreement",

        label: "I agree to the Terms and Conditions",

        field_type: "checkbox",

        default_value: false,

        validation: true,
      },
    ],

    step7: [
      // No specific fields, as it's the submission step
    ],
  },
};

export default formData;
