"use client";

import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import CountryCodeDropdown from "@/app/components/shared/CountryCodeDropdown";

const STEPS = [
  "Company Details",
  "Stakeholders Details",
  "Business Details",
  "Banking Details",
  "Other Information",
];

const PRODUCT_OPTIONS = [
  "Battery",
  "DCDB / ACDB",
  "Electrical Cables",
  "Inverter",
  "Module Mounting Structure (MMS)",
  "Solar Panel",
  "Transformers & Panels",
];

const fieldWrap = "flex flex-col min-w-0";
const labelClass = "mb-1 text-xs text-gray-500";
const inputClass =
  "w-full min-w-0 border-b border-gray-300 bg-transparent py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:border-[#4CAF50] focus:outline-none";

const Required = () => <span className="text-red-500">*</span>;

const codeTriggerClass =
  "flex items-center gap-1 bg-transparent text-sm text-gray-700 focus:outline-none";

const initialState = {
  // Step 1 — Company Details
  companyFullName: "",
  registeredAddress: "",
  zipCode: "",
  city: "",
  stateProvince: "",
  country: "Papua New Guinea",
  yearEstablished: "",
  dateOfIncorporation: "",
  placeOfIncorporation: "",
  underLawOf: "Papua New Guinea",
  typeOfOrganization: "",
  companyEmail: "",
  websiteLink: "",
  linkedinPage: "",
  officeTelephone: "",
  mobileNo: "",
  isWhatsapp: false,
  // Step 2 — Stakeholders Details
  stakeholderName: "",
  designation: "",
  nationality: "",
  idPassportNo: "",
  stakeholderEmail: "",
  stakeholderPhone: "",
  shareholding: "",
  stakeholderAddress: "",
  // Step 3 — Business Details
  natureOfBusiness: "",
  yearsInOperation: "",
  numberOfEmployees: "",
  annualTurnover: "",
  keyProducts: "",
  majorClients: "",
  certifications: "",
  businessRegistrationNo: "",
  // Step 4 — Banking Details
  bankName: "",
  accountName: "",
  accountNumber: "",
  swiftBic: "",
  iban: "",
  branchName: "",
  branchAddress: "",
  currency: "",
  // Step 5 — Other Information
  references: "",
  additionalNotes: "",
  howDidYouHear: "",
  declaration: false,
};

type FormState = typeof initialState;

const SupplyChainRegistration = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [officeCountry, setOfficeCountry] = useState({ dial_code: "+675", country_code: "pg" });
  const [mobileCountry, setMobileCountry] = useState({ dial_code: "+675", country_code: "pg" });
  const [stakeholderCountry, setStakeholderCountry] = useState({ dial_code: "+675", country_code: "pg" });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [customProducts, setCustomProducts] = useState<string[]>([]);
  const [customProduct, setCustomProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleProduct = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product],
    );
  };

  const addCustomProduct = () => {
    const value = customProduct.trim();
    if (!value) return;
    setCustomProducts((prev) => [...prev, value]);
    setSelectedProducts((prev) => [...prev, value]);
    setCustomProduct("");
  };

  const goNext = () => {
    setErrorMessage("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrorMessage("");
    setStep((s) => Math.max(s - 1, 0));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!form.declaration) {
      setErrorMessage("Please agree to the declaration before submitting.");
      return;
    }

    setIsLoading(true);

    const message = [
      "Supply Chain Partner Registration",
      "",
      "— Company Details —",
      `Company: ${form.companyFullName}`,
      `Registered address: ${form.registeredAddress}`,
      `Zip/Postal code: ${form.zipCode}`,
      `City: ${form.city}`,
      `State/Province: ${form.stateProvince}`,
      `Country: ${form.country}`,
      `Year established: ${form.yearEstablished}`,
      `Date & place of incorporation: ${form.dateOfIncorporation} / ${form.placeOfIncorporation}`,
      `Under the law of: ${form.underLawOf}`,
      `Type of organization: ${form.typeOfOrganization}`,
      `Company email: ${form.companyEmail}`,
      `Website: ${form.websiteLink}`,
      `LinkedIn: ${form.linkedinPage || "None"}`,
      `Office telephone: ${officeCountry.dial_code} ${form.officeTelephone}`,
      `Mobile: ${mobileCountry.dial_code} ${form.mobileNo} (WhatsApp/WeChat: ${form.isWhatsapp ? "Yes" : "No"})`,
      `Products: ${selectedProducts.join(", ") || "None"}`,
      "",
      "— Stakeholders Details —",
      `Name: ${form.stakeholderName}`,
      `Designation: ${form.designation}`,
      `Nationality: ${form.nationality}`,
      `ID/Passport: ${form.idPassportNo}`,
      `Email: ${form.stakeholderEmail}`,
      `Phone: ${stakeholderCountry.dial_code} ${form.stakeholderPhone}`,
      `Shareholding: ${form.shareholding}%`,
      `Address: ${form.stakeholderAddress}`,
      "",
      "— Business Details —",
      `Nature of business: ${form.natureOfBusiness}`,
      `Years in operation: ${form.yearsInOperation}`,
      `Employees: ${form.numberOfEmployees}`,
      `Annual turnover: ${form.annualTurnover}`,
      `Key products/services: ${form.keyProducts}`,
      `Major clients: ${form.majorClients || "None"}`,
      `Certifications: ${form.certifications || "None"}`,
      `Business registration no: ${form.businessRegistrationNo}`,
      "",
      "— Banking Details —",
      `Bank: ${form.bankName}`,
      `Account name: ${form.accountName}`,
      `Account number: ${form.accountNumber}`,
      `SWIFT/BIC: ${form.swiftBic}`,
      `IBAN: ${form.iban || "None"}`,
      `Branch: ${form.branchName}`,
      `Branch address: ${form.branchAddress}`,
      `Currency: ${form.currency}`,
      "",
      "— Other Information —",
      `References: ${form.references || "None"}`,
      `How did you hear about us: ${form.howDidYouHear || "None"}`,
      `Additional notes: ${form.additionalNotes || "None"}`,
    ].join("\n");

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname: form.stakeholderName || form.companyFullName,
          lastname: form.companyFullName,
          email: form.companyEmail,
          phone: form.mobileNo,
          phone_dial_code: mobileCountry.dial_code,
          phone_country_code: mobileCountry.country_code,
          is_whatsapp_number: form.isWhatsapp,
          message,
        }),
      );

      if (data.Code === "001") {
        setSuccessMessage(
          data.Message || "Your supply partner application has been submitted successfully!",
        );
        setForm(initialState);
        setSelectedProducts([]);
        setCustomProducts([]);
        setStep(0);
      } else {
        setErrorMessage(data.Message || "Failed to submit your application. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred while submitting the form.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="relative min-h-screen">
        <TopNavigation />

        <div className="absolute left-0 top-1/4 -z-10 hidden lg:block">
          <img
            src="/images/supply-partners/supply-partner.png"
            alt=""
            role="presentation"
            className="opacity-80"
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
          <div className="mb-6 max-w-3xl text-sm text-gray-700 lg:ml-24">
            <p>
              <span className="font-black text-[#4CAF50]">GREEN</span> is known for its
              seamless coordination with our suppliers, vendors and subcontractors.
            </p>
            <p>
              We take pride in collaborating with our partners to ensure our mutual success
              and the success of our clients.
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-8 flex flex-wrap items-center gap-y-3 rounded-md bg-gray-50 p-4 lg:ml-24">
            {STEPS.map((label, index) => (
              <React.Fragment key={label}>
                <button
                  type="button"
                  onClick={() => index < step && setStep(index)}
                  className={`flex items-center gap-2 ${
                    index < step ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      index <= step ? "bg-[#4CAF50] text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`text-xs font-semibold sm:text-sm ${
                      index === step ? "text-[#4CAF50]" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <span className="mx-2 text-gray-300">›</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="lg:ml-24">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              {/* Step content */}
              <div className="min-w-0">
                {step === 0 && (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                    <div className={fieldWrap}>
                      <label className={labelClass}>Company Full Name <Required /></label>
                      <input name="companyFullName" value={form.companyFullName} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Registered Address <Required /></label>
                      <input name="registeredAddress" value={form.registeredAddress} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Zip Code/Postal Code <Required /></label>
                      <input name="zipCode" value={form.zipCode} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>City <Required /></label>
                      <input name="city" value={form.city} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>State/Province <Required /></label>
                      <input name="stateProvince" value={form.stateProvince} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Country <Required /></label>
                      <div className="flex items-center gap-2 border-b border-gray-300 py-1.5">
                        <img src="/images/book-consulation/countryCode.png" alt="" className="h-4 w-5" />
                        <input name="country" value={form.country} onChange={handleChange} className="w-full bg-transparent text-sm text-gray-700 focus:outline-none" required />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Year Established <Required /></label>
                      <input name="yearEstablished" value={form.yearEstablished} onChange={handleChange} className={inputClass} placeholder="e.g. 2015" required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Date and Place of Incorporation <Required /></label>
                      <div className="flex gap-2">
                        <input type="date" name="dateOfIncorporation" value={form.dateOfIncorporation} onChange={handleChange} className={inputClass} required />
                        <input name="placeOfIncorporation" value={form.placeOfIncorporation} onChange={handleChange} className={inputClass} placeholder="Place" required />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Under the law of <Required /></label>
                      <div className="flex items-center gap-2 border-b border-gray-300 py-1.5">
                        <img src="/images/book-consulation/countryCode.png" alt="" className="h-4 w-5" />
                        <input name="underLawOf" value={form.underLawOf} onChange={handleChange} className="w-full bg-transparent text-sm text-gray-700 focus:outline-none" required />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Type of Organization <Required /></label>
                      <select name="typeOfOrganization" value={form.typeOfOrganization} onChange={handleChange} className={`${inputClass} cursor-pointer`} required>
                        <option value="">Choose Type</option>
                        <option value="private-limited">Private Limited</option>
                        <option value="public-limited">Public Limited</option>
                        <option value="partnership">Partnership</option>
                        <option value="sole-proprietorship">Sole Proprietorship</option>
                        <option value="llp">LLP</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Company Email ID <Required /></label>
                      <input type="email" name="companyEmail" value={form.companyEmail} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Website link <Required /></label>
                      <input name="websiteLink" value={form.websiteLink} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>LinkedIn Company Page</label>
                      <input name="linkedinPage" value={form.linkedinPage} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Office Telephone No <Required /></label>
                      <div className="flex items-center gap-2 border-b border-gray-300 py-1.5">
                        <CountryCodeDropdown
                          dialCode={officeCountry.dial_code}
                          countryCode={officeCountry.country_code}
                          onSelect={(dial_code, country_code) => setOfficeCountry({ dial_code, country_code })}
                          className={codeTriggerClass}
                        />
                        <input name="officeTelephone" value={form.officeTelephone} onChange={handleChange} className="w-full bg-transparent text-sm text-gray-700 focus:outline-none" required />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Mobile No <Required /></label>
                      <div className="flex items-center gap-2 border-b border-gray-300 py-1.5">
                        <CountryCodeDropdown
                          dialCode={mobileCountry.dial_code}
                          countryCode={mobileCountry.country_code}
                          onSelect={(dial_code, country_code) => setMobileCountry({ dial_code, country_code })}
                          className={codeTriggerClass}
                        />
                        <input name="mobileNo" value={form.mobileNo} onChange={handleChange} className="w-full bg-transparent text-sm text-gray-700 focus:outline-none" required />
                      </div>
                      <label className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                        <input type="checkbox" name="isWhatsapp" checked={form.isWhatsapp} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        Is this your WhatsApp or WeChat number?
                      </label>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                    <div className={fieldWrap}>
                      <label className={labelClass}>Stakeholder / Director Name <Required /></label>
                      <input name="stakeholderName" value={form.stakeholderName} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Designation <Required /></label>
                      <input name="designation" value={form.designation} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Nationality <Required /></label>
                      <input name="nationality" value={form.nationality} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>ID / Passport No <Required /></label>
                      <input name="idPassportNo" value={form.idPassportNo} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Email <Required /></label>
                      <input type="email" name="stakeholderEmail" value={form.stakeholderEmail} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Phone <Required /></label>
                      <div className="flex items-center gap-2 border-b border-gray-300 py-1.5">
                        <CountryCodeDropdown
                          dialCode={stakeholderCountry.dial_code}
                          countryCode={stakeholderCountry.country_code}
                          onSelect={(dial_code, country_code) => setStakeholderCountry({ dial_code, country_code })}
                          className={codeTriggerClass}
                        />
                        <input name="stakeholderPhone" value={form.stakeholderPhone} onChange={handleChange} className="w-full bg-transparent text-sm text-gray-700 focus:outline-none" required />
                      </div>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Shareholding (%) <Required /></label>
                      <input name="shareholding" value={form.shareholding} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Address <Required /></label>
                      <input name="stakeholderAddress" value={form.stakeholderAddress} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                    <div className={fieldWrap}>
                      <label className={labelClass}>Nature of Business <Required /></label>
                      <select name="natureOfBusiness" value={form.natureOfBusiness} onChange={handleChange} className={`${inputClass} cursor-pointer`} required>
                        <option value="">Choose Type</option>
                        <option value="manufacturer">Manufacturer</option>
                        <option value="distributor">Distributor</option>
                        <option value="trader">Trader</option>
                        <option value="service-provider">Service Provider</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Years in Operation <Required /></label>
                      <input name="yearsInOperation" value={form.yearsInOperation} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Number of Employees <Required /></label>
                      <input name="numberOfEmployees" value={form.numberOfEmployees} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Annual Turnover <Required /></label>
                      <input name="annualTurnover" value={form.annualTurnover} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Business Registration No <Required /></label>
                      <input name="businessRegistrationNo" value={form.businessRegistrationNo} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Certifications</label>
                      <input name="certifications" value={form.certifications} onChange={handleChange} className={inputClass} placeholder="e.g. ISO 9001" />
                    </div>
                    <div className={`${fieldWrap} sm:col-span-2`}>
                      <label className={labelClass}>Key Products / Services <Required /></label>
                      <input name="keyProducts" value={form.keyProducts} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={`${fieldWrap} sm:col-span-2`}>
                      <label className={labelClass}>Major Clients</label>
                      <input name="majorClients" value={form.majorClients} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                    <div className={fieldWrap}>
                      <label className={labelClass}>Bank Name <Required /></label>
                      <input name="bankName" value={form.bankName} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Account Name <Required /></label>
                      <input name="accountName" value={form.accountName} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Account Number <Required /></label>
                      <input name="accountNumber" value={form.accountNumber} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>SWIFT / BIC <Required /></label>
                      <input name="swiftBic" value={form.swiftBic} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>IBAN</label>
                      <input name="iban" value={form.iban} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Currency <Required /></label>
                      <select name="currency" value={form.currency} onChange={handleChange} className={`${inputClass} cursor-pointer`} required>
                        <option value="">Choose Currency</option>
                        <option value="PGK">PGK — Papua New Guinean Kina</option>
                        <option value="USD">USD — US Dollar</option>
                        <option value="AUD">AUD — Australian Dollar</option>
                        <option value="EUR">EUR — Euro</option>
                        <option value="GBP">GBP — British Pound</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Branch Name <Required /></label>
                      <input name="branchName" value={form.branchName} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Branch Address <Required /></label>
                      <input name="branchAddress" value={form.branchAddress} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                    <div className={fieldWrap}>
                      <label className={labelClass}>Trade References</label>
                      <textarea name="references" value={form.references} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Company name, contact, email/phone" />
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>How did you hear about us?</label>
                      <select name="howDidYouHear" value={form.howDidYouHear} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
                        <option value="">Choose Option</option>
                        <option value="referral">Referral</option>
                        <option value="website">Website</option>
                        <option value="social-media">Social Media</option>
                        <option value="event">Event / Conference</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className={fieldWrap}>
                      <label className={labelClass}>Additional Notes</label>
                      <textarea name="additionalNotes" value={form.additionalNotes} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
                    </div>
                    <label className="flex items-start gap-3 text-sm text-gray-700">
                      <input type="checkbox" name="declaration" checked={form.declaration} onChange={handleChange} className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      I declare that the information provided is true and correct, and I agree that GREEN may contact me about this application.
                    </label>
                  </div>
                )}
              </div>

              {/* Product Details panel */}
              <div className="rounded-md bg-gray-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">Product Details</h3>
                  <button
                    type="button"
                    onClick={addCustomProduct}
                    className="cursor-pointer rounded-md bg-gradient-to-r from-[#23B14D]/70 to-[#FFFE50]/70 px-5 py-1.5 text-sm font-bold text-gray-800 shadow-sm transition hover:brightness-105"
                  >
                    Add
                  </button>
                </div>
                <div className="mb-4">
                  <input
                    value={customProduct}
                    onChange={(e) => setCustomProduct(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomProduct();
                      }
                    }}
                    placeholder="Add a custom product"
                    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4CAF50] focus:outline-none"
                  />
                </div>
                <div className="space-y-3">
                  {[...PRODUCT_OPTIONS, ...customProducts].map((product) => (
                    <label key={product} className="flex items-center justify-between text-sm text-gray-700">
                      <span>{product}</span>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product)}
                        onChange={() => toggleProduct(product)}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {errorMessage && <p className="mt-6 text-sm text-red-600">{errorMessage}</p>}
            {successMessage && <p className="mt-6 text-sm text-green-600">{successMessage}</p>}

            {/* Navigation */}
            <div className="mt-10 mb-24 flex items-center justify-between">
              <div>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="cursor-pointer -skew-x-[16deg] rounded-md border border-gray-300 px-8 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
              </div>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="cursor-pointer -skew-x-[16deg] rounded-md bg-gradient-to-r from-[#23B14D]/70 to-[#FFFE50]/70 px-10 py-2.5 text-sm font-bold text-gray-800 shadow-md transition hover:brightness-105"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer -skew-x-[16deg] rounded-md bg-gradient-to-r from-[#23B14D]/70 to-[#FFFE50]/70 px-10 py-2.5 text-sm font-bold text-gray-900 shadow-md transition hover:brightness-105 disabled:opacity-50"
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:block hidden">
          <Chatbot />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SupplyChainRegistration;
