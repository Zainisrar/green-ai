"use client";

import { UploadCloud } from "lucide-react";
import React, { useState } from "react";
import CountryCodeDropdown from "@/app/components/shared/CountryCodeDropdown";
import { COUNTRIES } from "@/app/lib/countries";
import { buildReachUsPayload, submitReachUs } from "@/app/lib/forms";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./SupplyChainRegistration.module.css";

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
  ownersOrPartners: "",
  chiefExecutiveOfficer: "",
  chiefExecutiveEmail: "",
  chiefExecutivePhone: "",
  generalManager: "",
  generalManagerEmail: "",
  generalManagerPhone: "",
  contactPerson: "",
  contactPersonEmail: "",
  contactPersonPhone: "",
  financialManager: "",
  financialManagerEmail: "",
  financialManagerPhone: "",

  // Legacy/fallback stakeholder keys (kept for compatibility)
  stakeholderName: "",
  designation: "",
  nationality: "",
  idPassportNo: "",
  stakeholderEmail: "",
  stakeholderPhone: "",
  shareholding: "",
  stakeholderAddress: "",

  // Step 3 — Business Details
  annualTurnover: "",
  factoryAddress: "",
  factoryZipCode: "",
  factoryCity: "",
  factoryState: "",
  factoryCountry: "",
  factorySize: "",
  numberOfEmployees: "",
  yearsInOperation: "",
  internationalOfficesCount: "",
  internationalOfficesLocations: "",
  factoriesGloballyCount: "",
  natureOfBusiness: "",
  exportCountries: "",
  shippingTerms: "",
  factoryProductionCapacity: "",
  warehousesInfo: "",
  keyProducts: "",
  majorClients: "",

  // Step 4 — Banking Details
  bankName: "",
  accountName: "",
  accountNumber: "",
  accountType: "",
  routingCode: "",
  swiftBic: "",
  iban: "",
  branchName: "",
  branchAddress: "",
  bankPostalCode: "",
  currency: "",
  otherBankDetails: "",
  businessRegistrationNo: "",
  taxId: "",
  certifications: "",

  // Step 5 — Other Information
  environmentManagement: "no",
  forcedLabourCheck: "no",
  howDidYouHear: "",
  additionalNotes: "",
  references: "",
  declaration: false,
};

type FormState = typeof initialState;

const SupplyChainRegistration = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [officeCountry, setOfficeCountry] = useState({
    dial_code: "+675",
    country_code: "pg",
  });
  const [mobileCountry, setMobileCountry] = useState({
    dial_code: "+675",
    country_code: "pg",
  });
  const [stakeholderCountry, setStakeholderCountry] = useState({
    dial_code: "+675",
    country_code: "pg",
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [customProducts, setCustomProducts] = useState<string[]>([]);
  const [customProduct, setCustomProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleProduct = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product],
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
    if (step === 0) {
      if (!form.companyFullName.trim()) {
        setErrorMessage("Please enter your Company Full Name.");
        return;
      }
      if (!form.companyEmail.trim()) {
        setErrorMessage("Please enter your Company Email.");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrorMessage("");
    setStep((s) => Math.max(s - 1, 0));
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!form.companyFullName.trim()) {
      setErrorMessage("Please enter your Company Full Name in Step 1.");
      setStep(0);
      return;
    }
    if (!form.companyEmail.trim()) {
      setErrorMessage("Please enter your Company Email in Step 1.");
      setStep(0);
      return;
    }
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
      `Owners/Partners: ${form.ownersOrPartners || form.stakeholderName || "None"}`,
      `CEO: ${form.chiefExecutiveOfficer || "None"} (${form.chiefExecutiveEmail || "—"}, ${form.chiefExecutivePhone || "—"})`,
      `General Manager: ${form.generalManager || "None"} (${form.generalManagerEmail || "—"}, ${form.generalManagerPhone || "—"})`,
      `Contact Person: ${form.contactPerson || "None"} (${form.contactPersonEmail || "—"}, ${form.contactPersonPhone || "—"})`,
      `Financial Manager: ${form.financialManager || "None"} (${form.financialManagerEmail || "—"}, ${form.financialManagerPhone || "—"})`,
      "",
      "— Business Details —",
      `Annual turnover: ${form.annualTurnover || "None"}`,
      `Factory address: ${form.factoryAddress || form.registeredAddress || "None"}`,
      `Factory location: ${[form.factoryCity, form.factoryState, form.factoryZipCode, form.factoryCountry].filter(Boolean).join(", ") || "None"}`,
      `Factory sizes (Sqmts): ${form.factorySize || form.yearEstablished || "None"}`,
      `Employees: ${form.numberOfEmployees || "None"}`,
      `Years in operation: ${form.yearsInOperation || "None"}`,
      `International offices: ${form.internationalOfficesCount || "None"} (${form.internationalOfficesLocations || "None"})`,
      `Factories globally: ${form.factoriesGloballyCount || form.businessRegistrationNo || "None"}`,
      `Nature of business: ${form.natureOfBusiness || "None"}`,
      `Export countries: ${form.exportCountries || form.certifications || "None"}`,
      `Shipping terms: ${form.shippingTerms || form.majorClients || "None"}`,
      `Factory production capacity: ${form.factoryProductionCapacity || form.keyProducts || "None"}`,
      `Warehouses: ${form.warehousesInfo || "None"}`,
      "",
      "— Banking Details —",
      `Bank: ${form.bankName || "None"}`,
      `Account holder: ${form.accountName || "None"}`,
      `Account number: ${form.accountNumber || "None"}`,
      `Account type: ${form.accountType || form.branchName || "None"}`,
      `Routing/Branch code: ${form.routingCode || form.branchName || "None"}`,
      `SWIFT/BIC: ${form.swiftBic || "None"}`,
      `IBAN: ${form.iban || "None"}`,
      `Bank address: ${form.branchAddress || "None"} (${form.bankPostalCode || ""})`,
      `Currency: ${form.currency || "None"}`,
      `Other details: ${form.otherBankDetails || "None"}`,
      `Company registration no: ${form.businessRegistrationNo || "None"}`,
      `Tax ID: ${form.taxId || form.certifications || "None"}`,
      "",
      "— Other Information —",
      `Environmental Management System: ${form.environmentManagement}`,
      `Forced Labour Compliance: ${form.forcedLabourCheck}`,
      `How did you hear about us: ${form.howDidYouHear || "None"}`,
      `Additional notes: ${form.additionalNotes || "None"}`,
      `References: ${form.references || "None"}`,
    ].join("\n");

    try {
      const data = await submitReachUs(
        buildReachUsPayload({
          firstname:
            form.contactPerson ||
            form.chiefExecutiveOfficer ||
            form.ownersOrPartners ||
            form.companyFullName,
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
          data.Message ||
            "Your supply partner application has been submitted successfully!",
        );
        setForm(initialState);
        setSelectedProducts([]);
        setCustomProducts([]);
        setStep(0);
      } else {
        setErrorMessage(
          data.Message ||
            "Failed to submit your application. Please try again.",
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while submitting the form.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const desktop = (
    <div
      className={styles.page}
      data-node-id="7164:3370"
      style={{
        minHeight:
          step === 2
            ? 1644
            : step === 3
              ? 1475
              : step === 4
                ? 996
                : step === 1
                  ? 1250
                  : 1115,
      }}
    >
      <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />

      <div className={styles.leftArtwork}>
        <svg viewBox="0 0 100 723" aria-hidden="true">
          <text
            fill="none"
            stroke="#d9d9d9"
            strokeWidth="1.2"
            fontFamily="Raleway, sans-serif"
            fontSize="85"
            fontWeight="900"
            transform="translate(85 710) rotate(-90)"
          >
            SUPPLY PARTNER
          </text>
        </svg>
      </div>

      <div className={styles.content}>
        <div className={styles.introduction}>
          <p>
            <span className="font-black text-[#4CAF50]">GREEN</span> is known
            for its seamless coordination with our suppliers, vendors and
            subcontractors.
          </p>
          <p>
            We take pride in collaborating with our partners to ensure our
            mutual success and the success of our clients.
          </p>
        </div>

        {/* Stepper */}
        <div className={styles.stepper}>
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
                    index <= step
                      ? "bg-[#4CAF50] text-white"
                      : "bg-gray-300 text-gray-600"
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

        <form onSubmit={handleSubmit} className={styles.form}>
          <div
            className={`${styles.formGrid} ${step === 4 ? styles.stepFiveGrid : ""}`}
          >
            {/* Step content */}
            <div className={styles.fieldArea}>
              {step === 0 && (
                <div className={styles.fields}>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Company Full Name <Required />
                    </label>
                    <input
                      name="companyFullName"
                      value={form.companyFullName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Registered Address <Required />
                    </label>
                    <input
                      name="registeredAddress"
                      value={form.registeredAddress}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Zip Code/Postal Code <Required />
                    </label>
                    <input
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      City <Required />
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      State/Province <Required />
                    </label>
                    <input
                      name="stateProvince"
                      value={form.stateProvince}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Country <Required />
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Year Established <Required />
                    </label>
                    <input
                      name="yearEstablished"
                      value={form.yearEstablished}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 2015"
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Date and Place of Incorporation <Required />
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        name="dateOfIncorporation"
                        value={form.dateOfIncorporation}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                      <input
                        name="placeOfIncorporation"
                        value={form.placeOfIncorporation}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Place"
                        required
                      />
                    </div>
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Under the law of <Required />
                    </label>
                    <select
                      name="underLawOf"
                      value={form.underLawOf}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Type of Organization <Required />
                    </label>
                    <select
                      name="typeOfOrganization"
                      value={form.typeOfOrganization}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                      required
                    >
                      <option value="">Choose Type</option>
                      <option value="private-limited">Private Limited</option>
                      <option value="public-limited">Public Limited</option>
                      <option value="partnership">Partnership</option>
                      <option value="sole-proprietorship">
                        Sole Proprietorship
                      </option>
                      <option value="llp">LLP</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Company Email ID <Required />
                    </label>
                    <input
                      type="email"
                      name="companyEmail"
                      value={form.companyEmail}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Website link <Required />
                    </label>
                    <input
                      name="websiteLink"
                      value={form.websiteLink}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>LinkedIn Company Page</label>
                    <input
                      name="linkedinPage"
                      value={form.linkedinPage}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Office Telephone No <Required />
                    </label>
                    <div className="flex items-center gap-2 border-b border-gray-300 py-1.5">
                      <CountryCodeDropdown
                        dialCode={officeCountry.dial_code}
                        countryCode={officeCountry.country_code}
                        onSelect={(dial_code, country_code) =>
                          setOfficeCountry({ dial_code, country_code })
                        }
                        className={codeTriggerClass}
                      />
                      <input
                        name="officeTelephone"
                        value={form.officeTelephone}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Mobile No <Required />
                    </label>
                    <div className="flex items-center gap-2 border-b border-gray-300 py-1.5">
                      <CountryCodeDropdown
                        dialCode={mobileCountry.dial_code}
                        countryCode={mobileCountry.country_code}
                        onSelect={(dial_code, country_code) =>
                          setMobileCountry({ dial_code, country_code })
                        }
                        className={codeTriggerClass}
                      />
                      <input
                        name="mobileNo"
                        value={form.mobileNo}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
                        required
                      />
                    </div>
                    <label className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        name="isWhatsapp"
                        checked={form.isWhatsapp}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      Is this your WhatsApp or WeChat number?
                    </label>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className={styles.stakeholderFields}>
                  <div className={`${fieldWrap} ${styles.ownerField}`}>
                    <h2 className={styles.welcomeTitle}>Welcome GREEN</h2>
                    <label className={labelClass}>
                      Name of the Owners or Partners <Required />
                    </label>
                    <input
                      name="ownersOrPartners"
                      value={form.ownersOrPartners}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  {[
                    [
                      "chiefExecutiveOfficer",
                      "Name of the Chief Executive Officer",
                      "chiefExecutiveEmail",
                      "Chief Executive Officer Email ID",
                      "chiefExecutivePhone",
                      "Chief Executive Phone No",
                    ],
                    [
                      "generalManager",
                      "Name of the General Manager",
                      "generalManagerEmail",
                      "General Manager Email ID",
                      "generalManagerPhone",
                      "General Manager Phone No",
                    ],
                    [
                      "contactPerson",
                      "Name of the Contact Person",
                      "contactPersonEmail",
                      "Contact Person Email ID",
                      "contactPersonPhone",
                      "Contact Person Phone No",
                    ],
                    [
                      "financialManager",
                      "Name of the Financial Manager",
                      "financialManagerEmail",
                      "Financial Manager Email ID",
                      "financialManagerPhone",
                      "Financial Manager Phone No",
                    ],
                  ].map(
                    ([
                      nameKey,
                      nameLabel,
                      emailKey,
                      emailLabel,
                      phoneKey,
                      phoneLabel,
                    ]) => (
                      <React.Fragment key={nameKey}>
                        <div className={fieldWrap}>
                          <label className={labelClass}>
                            {nameLabel}{" "}
                            {nameKey !== "financialManager" && <Required />}
                          </label>
                          <input
                            name={nameKey}
                            value={form[nameKey as keyof typeof form] as string}
                            onChange={handleChange}
                            className={inputClass}
                            required={nameKey !== "financialManager"}
                          />
                        </div>
                        <div className={fieldWrap}>
                          <label className={labelClass}>
                            {emailLabel}{" "}
                            {nameKey !== "financialManager" && <Required />}
                          </label>
                          <input
                            type="email"
                            name={emailKey}
                            value={
                              form[emailKey as keyof typeof form] as string
                            }
                            onChange={handleChange}
                            className={inputClass}
                            required={nameKey !== "financialManager"}
                          />
                        </div>
                        <div className={fieldWrap}>
                          <label className={labelClass}>
                            {phoneLabel}{" "}
                            {nameKey !== "financialManager" && <Required />}
                          </label>
                          <div className={styles.phoneField}>
                            <CountryCodeDropdown
                              dialCode={stakeholderCountry.dial_code}
                              countryCode={stakeholderCountry.country_code}
                              onSelect={(dial_code, country_code) =>
                                setStakeholderCountry({
                                  dial_code,
                                  country_code,
                                })
                              }
                              className={codeTriggerClass}
                            />
                            <input
                              name={phoneKey}
                              value={
                                form[phoneKey as keyof typeof form] as string
                              }
                              onChange={handleChange}
                              className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
                              required={nameKey !== "financialManager"}
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    ),
                  )}
                  <div className={`${fieldWrap} ${styles.uploadField}`}>
                    <label className={labelClass}>
                      Profile Photo / Document (Upload not yet supported online)
                    </label>
                    <label
                      className={`${styles.uploadBox} opacity-75`}
                      style={{ cursor: "default" }}
                    >
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,.txt"
                        className="sr-only"
                        disabled
                        aria-disabled="true"
                      />
                      <span className={styles.uploadInfo}>
                        <UploadCloud aria-hidden="true" />
                        <span>
                          <strong>Online file upload not yet supported</strong>
                          <small>
                            Document attachment is not supported online.
                            Documents will be requested during supplier vetting.
                          </small>
                        </span>
                      </span>
                      <b style={{ opacity: 0.6 }}>Not Supported</b>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className={styles.businessFields}>
                  <h2 className={styles.welcomeTitle}>Welcome GREEN</h2>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Annual Sales (Recent FY) <Required />
                    </label>
                    <input
                      name="annualTurnover"
                      value={form.annualTurnover}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Enter Annual Amount"
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>Factory Address</label>
                    <input
                      name="factoryAddress"
                      value={form.factoryAddress}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  {[
                    ["factoryZipCode", "Zip Code/Postal Code"],
                    ["factoryCity", "City"],
                    ["factoryState", "State/Province"],
                    ["factoryCountry", "Country"],
                    ["factorySize", "Factory Sizes (Sqmts)"],
                    ["numberOfEmployees", "No. of Employees"],
                    [
                      "internationalOfficesCount",
                      "No. of International Offices",
                    ],
                    [
                      "internationalOfficesLocations",
                      "Location of International Offices",
                    ],
                    ["factoriesGloballyCount", "No. of Factories Globally"],
                    ["natureOfBusiness", "Nature of Business"],
                    ["exportCountries", "Countries to Which you Export"],
                    ["shippingTerms", "International Shipping Terms"],
                  ].map(([key, label]) => (
                    <div className={fieldWrap} key={key}>
                      <label className={labelClass}>{label}</label>
                      <input
                        name={key}
                        value={form[key as keyof typeof form] as string}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  ))}
                  <div className={`${fieldWrap} ${styles.businessFull}`}>
                    <label className={labelClass}>
                      Factory Production Capacity
                    </label>
                    <input
                      name="factoryProductionCapacity"
                      value={form.factoryProductionCapacity}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className={`${fieldWrap} ${styles.businessFull}`}>
                    <label className={labelClass}>
                      No. of Warehouses and Location Address
                    </label>
                    <input
                      name="warehousesInfo"
                      value={form.warehousesInfo}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className={`${fieldWrap} ${styles.businessUpload}`}>
                    <label className={labelClass}>
                      Annual FY Reports From Last Three Years (Optional - Upload
                      not yet supported online)
                    </label>
                    <label
                      className={`${styles.compactUpload} opacity-75`}
                      style={{ cursor: "default" }}
                    >
                      <input
                        type="file"
                        className="sr-only"
                        disabled
                        aria-disabled="true"
                      />
                      <UploadCloud aria-hidden="true" />
                      <span>
                        Online report upload not yet supported
                        <small>
                          Financial documentation will be requested during
                          evaluation.
                        </small>
                      </span>
                      <b style={{ opacity: 0.6 }}>Not Supported</b>
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className={styles.bankFields}>
                  <h2>Bank Information</h2>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Bank Name <Required />
                    </label>
                    <input
                      name="bankName"
                      value={form.bankName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Routing No/Branch Code/Bank Key <Required />
                    </label>
                    <input
                      name="accountName"
                      value={form.accountName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Swift Code <Required />
                    </label>
                    <input
                      name="accountNumber"
                      value={form.accountNumber}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Bank Address, City, State <Required />
                    </label>
                    <input
                      name="swiftBic"
                      value={form.swiftBic}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Postal code <Required />
                    </label>
                    <input
                      name="iban"
                      value={form.iban}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Country <Required />
                    </label>
                    <select
                      name="currency"
                      value={form.currency}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                      required
                    >
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
                    <label className={labelClass}>Account Type</label>
                    <input
                      name="branchName"
                      value={form.branchName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      IBAN (International Bank Account Number) <Required />
                    </label>
                    <input
                      name="branchAddress"
                      value={form.branchAddress}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Account holder&apos;s name <Required />
                    </label>
                    <input
                      name="accountName"
                      value={form.accountName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>Routing Code</label>
                    <input
                      name="branchName"
                      value={form.branchName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>Any other details</label>
                    <input
                      name="branchAddress"
                      value={form.branchAddress}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <h2 className={styles.otherBankTitle}>Other Information</h2>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Company Registration No
                    </label>
                    <input
                      name="businessRegistrationNo"
                      value={form.businessRegistrationNo}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>Tax ID</label>
                    <input
                      name="certifications"
                      value={form.certifications}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className={styles.otherFields}>
                  <div className={fieldWrap}>
                    <span className={labelClass}>
                      Does the organization have any Environmental Management
                      System
                    </span>
                    <div className={styles.radioRow}>
                      <label>
                        <input
                          type="radio"
                          name="environmentManagement"
                          value="yes"
                          checked={form.environmentManagement === "yes"}
                          onChange={handleChange}
                        />{" "}
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="environmentManagement"
                          value="no"
                          checked={form.environmentManagement === "no"}
                          onChange={handleChange}
                        />{" "}
                        No
                      </label>
                    </div>
                  </div>
                  <div className={fieldWrap}>
                    <span className={labelClass}>
                      Does the company source any materials from companies
                      involved in forced labour / human trafficking
                    </span>
                    <div className={styles.radioRow}>
                      <label>
                        <input
                          type="radio"
                          name="forcedLabourCheck"
                          value="yes"
                          checked={form.forcedLabourCheck === "yes"}
                          onChange={handleChange}
                        />{" "}
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="forcedLabourCheck"
                          value="no"
                          checked={form.forcedLabourCheck === "no"}
                          onChange={handleChange}
                        />{" "}
                        No
                      </label>
                    </div>
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      How did you know about GREEN Limited?
                    </label>
                    <select
                      name="howDidYouHear"
                      value={form.howDidYouHear}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Choose Option</option>
                      <option value="referral">Referral</option>
                      <option value="website">Website</option>
                      <option value="social-media">Social Media</option>
                      <option value="event">Event / Conference</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div
                    className={fieldWrap}
                    style={{ gridColumn: "1 / -1", marginTop: "12px" }}
                  >
                    <label className="flex items-start gap-2.5 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        name="declaration"
                        checked={form.declaration}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        required
                      />
                      <span>
                        I confirm and declare that the information provided in
                        this registration is true, accurate, and complete to the
                        best of my knowledge. <Required />
                      </span>
                    </label>
                  </div>
                  <div className={fieldWrap}>
                    <label className={labelClass}>Comments/Feedback</label>
                    <input
                      name="additionalNotes"
                      value={form.additionalNotes}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Product Details / company summary panel */}
            {step === 1 ? (
              <aside className={styles.companySummary}>
                <h3>Company Details</h3>
                <dl>
                  <div>
                    <dt>Company Name</dt>
                    <dd>{form.companyFullName || "GREEN"}</dd>
                  </div>
                  <div>
                    <dt>Registered Address</dt>
                    <dd>{form.registeredAddress || "—"}</dd>
                  </div>
                  <div>
                    <dt>Company Email ID</dt>
                    <dd>{form.companyEmail || "—"}</dd>
                  </div>
                  <div>
                    <dt>Office Telephone No</dt>
                    <dd>{form.officeTelephone || "—"}</dd>
                  </div>
                  <div>
                    <dt>Mobile No</dt>
                    <dd>{form.mobileNo || "—"}</dd>
                  </div>
                </dl>
              </aside>
            ) : (
              <div className={styles.products}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">
                    Product Details
                  </h3>
                  <button
                    type="button"
                    onClick={addCustomProduct}
                    className={`${styles.figmaButton} ${styles.addButton}`}
                  >
                    <img
                      src="/images/supply-partners/form-action-button.svg"
                      alt=""
                      aria-hidden="true"
                    />
                    <span>Add</span>
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
                    <label
                      key={product}
                      className="flex items-center justify-between text-sm text-gray-700"
                    >
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
            )}
          </div>

          {errorMessage && (
            <p className="mt-6 text-sm text-red-600">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-6 text-sm text-green-600">{successMessage}</p>
          )}

          {/* Navigation */}
          <div
            className={`${styles.navigation} ${step === 1 ? styles.stepTwoNavigation : step === 2 ? styles.stepThreeNavigation : step === 3 ? styles.stepFourNavigation : step === 4 ? styles.stepFiveNavigation : ""}`}
          >
            <div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className={`${styles.figmaButton} ${styles.backButton}`}
                >
                  <img
                    src="/images/supply-partners/form-action-button.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  <span>Back</span>
                </button>
              )}
            </div>
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className={`${styles.figmaButton} ${styles.nextButton}`}
              >
                <img
                  src="/images/supply-partners/form-action-button.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>Next</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className={`${styles.figmaButton} ${styles.nextButton}`}
              >
                <img
                  src="/images/supply-partners/form-action-button.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>{isLoading ? "Submitting..." : "Submit"}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );

  const mobile = (
    <main className={styles.mobilePage} data-node-id="7164:3370-mobile">
      <SiteHeader panel="logoOnly" />

      <div className={styles.mobileContainer}>
        {/* Intro Section */}
        <div className={styles.mobileIntro}>
          <div className={styles.mobileBadge}>SUPPLY PARTNER</div>
          <h1 className={styles.mobileTitle}>Supply Chain Registration</h1>
          <p className={styles.mobileDesc}>
            <span className="font-bold text-[#23b14d]">GREEN</span> is known for
            its seamless coordination with our suppliers, vendors and
            subcontractors. We take pride in collaborating with our partners to
            ensure mutual success.
          </p>
        </div>

        {/* Mobile Stepper */}
        <div className={styles.mobileStepper}>
          <div className={styles.mobileStepHeader}>
            <span className={styles.mobileStepNumber}>
              Step {step + 1} of {STEPS.length}
            </span>
            <span className={styles.mobileStepName}>{STEPS[step]}</span>
          </div>
          <div
            className={styles.mobileProgressBar}
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
          >
            <div
              className={styles.mobileProgressFill}
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <div className={styles.mobileStepDots}>
            {STEPS.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => idx < step && setStep(idx)}
                disabled={idx > step}
                className={`${styles.mobileStepDot} ${
                  idx === step
                    ? styles.mobileStepDotActive
                    : idx < step
                      ? styles.mobileStepDotCompleted
                      : ""
                }`}
                aria-label={`Step ${idx + 1}: ${label}`}
              >
                {idx < step ? "✓" : idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Form */}
        <form onSubmit={handleSubmit} className={styles.mobileForm}>
          {step === 0 && (
            <div className={styles.mobileCard}>
              <h2 className={styles.mobileSectionTitle}>Company Details</h2>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-companyFullName"
                  className={styles.mobileLabel}
                >
                  Company Full Name <Required />
                </label>
                <input
                  id="m-companyFullName"
                  name="companyFullName"
                  value={form.companyFullName}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  autoComplete="organization"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-registeredAddress"
                  className={styles.mobileLabel}
                >
                  Registered Address <Required />
                </label>
                <input
                  id="m-registeredAddress"
                  name="registeredAddress"
                  value={form.registeredAddress}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-zipCode" className={styles.mobileLabel}>
                  Zip Code/Postal Code <Required />
                </label>
                <input
                  id="m-zipCode"
                  name="zipCode"
                  value={form.zipCode}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  autoComplete="postal-code"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-city" className={styles.mobileLabel}>
                  City <Required />
                </label>
                <input
                  id="m-city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  autoComplete="address-level2"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-stateProvince" className={styles.mobileLabel}>
                  State/Province <Required />
                </label>
                <input
                  id="m-stateProvince"
                  name="stateProvince"
                  value={form.stateProvince}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  autoComplete="address-level1"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-country" className={styles.mobileLabel}>
                  Country <Required />
                </label>
                <select
                  id="m-country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={styles.mobileSelect}
                  required
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-yearEstablished"
                  className={styles.mobileLabel}
                >
                  Year Established <Required />
                </label>
                <input
                  id="m-yearEstablished"
                  name="yearEstablished"
                  value={form.yearEstablished}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  placeholder="e.g. 2015"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-dateOfIncorporation"
                  className={styles.mobileLabel}
                >
                  Date of Incorporation <Required />
                </label>
                <input
                  id="m-dateOfIncorporation"
                  type="date"
                  name="dateOfIncorporation"
                  value={form.dateOfIncorporation}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-placeOfIncorporation"
                  className={styles.mobileLabel}
                >
                  Place of Incorporation <Required />
                </label>
                <input
                  id="m-placeOfIncorporation"
                  name="placeOfIncorporation"
                  value={form.placeOfIncorporation}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  placeholder="e.g. Port Moresby"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-underLawOf" className={styles.mobileLabel}>
                  Under the law of <Required />
                </label>
                <select
                  id="m-underLawOf"
                  name="underLawOf"
                  value={form.underLawOf}
                  onChange={handleChange}
                  className={styles.mobileSelect}
                  required
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-typeOfOrganization"
                  className={styles.mobileLabel}
                >
                  Type of Organization <Required />
                </label>
                <select
                  id="m-typeOfOrganization"
                  name="typeOfOrganization"
                  value={form.typeOfOrganization}
                  onChange={handleChange}
                  className={styles.mobileSelect}
                  required
                >
                  <option value="">Choose Type</option>
                  <option value="private-limited">Private Limited</option>
                  <option value="public-limited">Public Limited</option>
                  <option value="partnership">Partnership</option>
                  <option value="sole-proprietorship">
                    Sole Proprietorship
                  </option>
                  <option value="llp">LLP</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-companyEmail" className={styles.mobileLabel}>
                  Company Email ID <Required />
                </label>
                <input
                  id="m-companyEmail"
                  type="email"
                  name="companyEmail"
                  value={form.companyEmail}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-websiteLink" className={styles.mobileLabel}>
                  Website link <Required />
                </label>
                <input
                  id="m-websiteLink"
                  type="url"
                  name="websiteLink"
                  value={form.websiteLink}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-linkedinPage" className={styles.mobileLabel}>
                  LinkedIn Company Page
                </label>
                <input
                  id="m-linkedinPage"
                  name="linkedinPage"
                  value={form.linkedinPage}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-officeTelephone"
                  className={styles.mobileLabel}
                >
                  Office Telephone No <Required />
                </label>
                <div className={styles.mobilePhoneGroup}>
                  <CountryCodeDropdown
                    dialCode={officeCountry.dial_code}
                    countryCode={officeCountry.country_code}
                    onSelect={(dial_code, country_code) =>
                      setOfficeCountry({ dial_code, country_code })
                    }
                    className={codeTriggerClass}
                  />
                  <input
                    id="m-officeTelephone"
                    type="tel"
                    name="officeTelephone"
                    value={form.officeTelephone}
                    onChange={handleChange}
                    className={styles.mobilePhoneInput}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-mobileNo" className={styles.mobileLabel}>
                  Mobile No <Required />
                </label>
                <div className={styles.mobilePhoneGroup}>
                  <CountryCodeDropdown
                    dialCode={mobileCountry.dial_code}
                    countryCode={mobileCountry.country_code}
                    onSelect={(dial_code, country_code) =>
                      setMobileCountry({ dial_code, country_code })
                    }
                    className={codeTriggerClass}
                  />
                  <input
                    id="m-mobileNo"
                    type="tel"
                    name="mobileNo"
                    value={form.mobileNo}
                    onChange={handleChange}
                    className={styles.mobilePhoneInput}
                    autoComplete="tel"
                    required
                  />
                </div>
                <label
                  htmlFor="m-isWhatsapp"
                  className={styles.mobileCheckboxLabel}
                >
                  <input
                    id="m-isWhatsapp"
                    type="checkbox"
                    name="isWhatsapp"
                    checked={form.isWhatsapp}
                    onChange={handleChange}
                    className={styles.mobileCheckbox}
                  />
                  <span>Is this your WhatsApp or WeChat number?</span>
                </label>
              </div>

              {/* Product Details section on Mobile */}
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 16,
                  borderTop: "1.5px solid #f3f4f6",
                }}
              >
                <h3 className={styles.mobileSectionTitle}>Product Details</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Select products or systems your company provides:
                </p>
                <div className={styles.mobileProductList}>
                  {[...PRODUCT_OPTIONS, ...customProducts].map((product) => {
                    const prodId = `m-prod-${product.replace(/[^a-zA-Z0-9]/g, "-")}`;
                    return (
                      <label
                        key={product}
                        htmlFor={prodId}
                        className={styles.mobileProductItem}
                      >
                        <span>{product}</span>
                        <input
                          id={prodId}
                          type="checkbox"
                          checked={selectedProducts.includes(product)}
                          onChange={() => toggleProduct(product)}
                          className={styles.mobileCheckbox}
                        />
                      </label>
                    );
                  })}
                </div>
                <div className={styles.mobileCustomProductRow}>
                  <input
                    id="m-customProduct"
                    aria-label="Add custom product"
                    value={customProduct}
                    onChange={(e) => setCustomProduct(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomProduct();
                      }
                    }}
                    placeholder="Add custom product"
                    className={styles.mobileInput}
                  />
                  <button
                    type="button"
                    onClick={addCustomProduct}
                    className={styles.mobileAddProductBtn}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className={styles.mobileCard}>
              <h2 className={styles.mobileSectionTitle}>
                Stakeholders Details
              </h2>

              {/* Compact Company Summary */}
              <div className={styles.mobileSummaryCard}>
                <div className={styles.mobileSummaryTitle}>Company Summary</div>
                <div className={styles.mobileSummaryRow}>
                  <span className={styles.mobileSummaryKey}>Company:</span>
                  <span className={styles.mobileSummaryValue}>
                    {form.companyFullName || "GREEN"}
                  </span>
                </div>
                <div className={styles.mobileSummaryRow}>
                  <span className={styles.mobileSummaryKey}>Email:</span>
                  <span className={styles.mobileSummaryValue}>
                    {form.companyEmail || "—"}
                  </span>
                </div>
                <div className={styles.mobileSummaryRow}>
                  <span className={styles.mobileSummaryKey}>Phone:</span>
                  <span className={styles.mobileSummaryValue}>
                    {form.officeTelephone || form.mobileNo || "—"}
                  </span>
                </div>
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-ownersOrPartners"
                  className={styles.mobileLabel}
                >
                  Name of Owners or Partners <Required />
                </label>
                <input
                  id="m-ownersOrPartners"
                  name="ownersOrPartners"
                  value={form.ownersOrPartners}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              {[
                [
                  "chiefExecutiveOfficer",
                  "Name of Chief Executive Officer",
                  "chiefExecutiveEmail",
                  "CEO Email ID",
                  "chiefExecutivePhone",
                  "CEO Phone No",
                ],
                [
                  "generalManager",
                  "Name of General Manager",
                  "generalManagerEmail",
                  "General Manager Email ID",
                  "generalManagerPhone",
                  "General Manager Phone No",
                ],
                [
                  "contactPerson",
                  "Name of Contact Person",
                  "contactPersonEmail",
                  "Contact Person Email ID",
                  "contactPersonPhone",
                  "Contact Person Phone No",
                ],
                [
                  "financialManager",
                  "Name of Financial Manager",
                  "financialManagerEmail",
                  "Financial Manager Email ID",
                  "financialManagerPhone",
                  "Financial Manager Phone No",
                ],
              ].map(
                ([
                  nameKey,
                  nameLabel,
                  emailKey,
                  emailLabel,
                  phoneKey,
                  phoneLabel,
                ]) => {
                  const isOptional = nameKey === "financialManager";
                  return (
                    <div
                      key={nameKey}
                      style={{
                        paddingBottom: 16,
                        marginBottom: 16,
                        borderBottom: "1px solid #f3f4f6",
                      }}
                    >
                      <div className={styles.mobileFieldWrap}>
                        <label
                          htmlFor={`m-${nameKey}`}
                          className={styles.mobileLabel}
                        >
                          {nameLabel} {!isOptional && <Required />}
                        </label>
                        <input
                          id={`m-${nameKey}`}
                          name={nameKey}
                          value={
                            (form[nameKey as keyof typeof form] as string) || ""
                          }
                          onChange={handleChange}
                          className={styles.mobileInput}
                          required={!isOptional}
                        />
                      </div>
                      <div className={styles.mobileFieldWrap}>
                        <label
                          htmlFor={`m-${emailKey}`}
                          className={styles.mobileLabel}
                        >
                          {emailLabel} {!isOptional && <Required />}
                        </label>
                        <input
                          id={`m-${emailKey}`}
                          type="email"
                          name={emailKey}
                          value={
                            (form[emailKey as keyof typeof form] as string) ||
                            ""
                          }
                          onChange={handleChange}
                          className={styles.mobileInput}
                          required={!isOptional}
                        />
                      </div>
                      <div className={styles.mobileFieldWrap}>
                        <label
                          htmlFor={`m-${phoneKey}`}
                          className={styles.mobileLabel}
                        >
                          {phoneLabel} {!isOptional && <Required />}
                        </label>
                        <div className={styles.mobilePhoneGroup}>
                          <CountryCodeDropdown
                            dialCode={stakeholderCountry.dial_code}
                            countryCode={stakeholderCountry.country_code}
                            onSelect={(dial_code, country_code) =>
                              setStakeholderCountry({
                                dial_code,
                                country_code,
                              })
                            }
                            className={codeTriggerClass}
                          />
                          <input
                            id={`m-${phoneKey}`}
                            type="tel"
                            name={phoneKey}
                            value={
                              (form[phoneKey as keyof typeof form] as string) ||
                              ""
                            }
                            onChange={handleChange}
                            className={styles.mobilePhoneInput}
                            required={!isOptional}
                          />
                        </div>
                      </div>
                    </div>
                  );
                },
              )}

              {/* Profile Upload */}
              <div className={styles.mobileFieldWrap}>
                <span className={styles.mobileLabel}>
                  Profile Photo / Document (Upload not yet supported online)
                </span>
                <label
                  htmlFor="m-profileUpload"
                  className={`${styles.mobileUploadArea} opacity-75`}
                  style={{ cursor: "default" }}
                >
                  <input
                    id="m-profileUpload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,.txt"
                    className="sr-only"
                    disabled
                    aria-disabled="true"
                  />
                  <UploadCloud
                    className={styles.mobileUploadIcon}
                    aria-hidden="true"
                  />
                  <span className={styles.mobileUploadText}>
                    Online file upload not yet supported
                  </span>
                  <span className={styles.mobileUploadSubtext}>
                    Documents will be requested during supplier vetting
                  </span>
                  <span
                    className={styles.mobileUploadButton}
                    style={{ opacity: 0.6 }}
                  >
                    Not Supported
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.mobileCard}>
              <h2 className={styles.mobileSectionTitle}>Business Details</h2>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-annualTurnover"
                  className={styles.mobileLabel}
                >
                  Annual Sales (Recent FY) <Required />
                </label>
                <input
                  id="m-annualTurnover"
                  name="annualTurnover"
                  value={form.annualTurnover}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  placeholder="Enter Annual Amount"
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-factoryAddress"
                  className={styles.mobileLabel}
                >
                  Factory Address
                </label>
                <input
                  id="m-factoryAddress"
                  name="factoryAddress"
                  value={form.factoryAddress}
                  onChange={handleChange}
                  className={styles.mobileInput}
                />
              </div>

              {[
                ["factoryZipCode", "Zip Code/Postal Code"],
                ["factoryCity", "City"],
                ["factoryState", "State/Province"],
                ["factoryCountry", "Country"],
                ["factorySize", "Factory Sizes (Sqmts)"],
                ["numberOfEmployees", "No. of Employees"],
                ["internationalOfficesCount", "No. of International Offices"],
                [
                  "internationalOfficesLocations",
                  "Location of International Offices",
                ],
                ["factoriesGloballyCount", "No. of Factories Globally"],
                ["natureOfBusiness", "Nature of Business"],
                ["exportCountries", "Countries to Which you Export"],
                ["shippingTerms", "International Shipping Terms"],
              ].map(([key, label]) => (
                <div key={key} className={styles.mobileFieldWrap}>
                  <label htmlFor={`m-${key}`} className={styles.mobileLabel}>
                    {label}
                  </label>
                  <input
                    id={`m-${key}`}
                    name={key}
                    value={(form[key as keyof typeof form] as string) || ""}
                    onChange={handleChange}
                    className={styles.mobileInput}
                  />
                </div>
              ))}

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-factoryProductionCapacity"
                  className={styles.mobileLabel}
                >
                  Factory Production Capacity
                </label>
                <input
                  id="m-factoryProductionCapacity"
                  name="factoryProductionCapacity"
                  value={form.factoryProductionCapacity}
                  onChange={handleChange}
                  className={styles.mobileInput}
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-warehousesInfo"
                  className={styles.mobileLabel}
                >
                  No. of Warehouses and Location Address
                </label>
                <input
                  id="m-warehousesInfo"
                  name="warehousesInfo"
                  value={form.warehousesInfo}
                  onChange={handleChange}
                  className={styles.mobileInput}
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <span className={styles.mobileLabel}>
                  Annual FY Reports From Last Three Years (Optional - Upload not
                  yet supported online)
                </span>
                <label
                  htmlFor="m-reportsUpload"
                  className={`${styles.mobileUploadArea} opacity-75`}
                  style={{ cursor: "default" }}
                >
                  <input
                    id="m-reportsUpload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="sr-only"
                    disabled
                    aria-disabled="true"
                  />
                  <UploadCloud
                    className={styles.mobileUploadIcon}
                    aria-hidden="true"
                  />
                  <span className={styles.mobileUploadText}>
                    Online report upload not yet supported
                  </span>
                  <span className={styles.mobileUploadSubtext}>
                    Financial reports requested during vetting
                  </span>
                  <span
                    className={styles.mobileUploadButton}
                    style={{ opacity: 0.6 }}
                  >
                    Not Supported
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.mobileCard}>
              <h2 className={styles.mobileSectionTitle}>Bank Information</h2>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-bankName" className={styles.mobileLabel}>
                  Bank Name <Required />
                </label>
                <input
                  id="m-bankName"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-routingCode" className={styles.mobileLabel}>
                  Routing No / Branch Code / Bank Key <Required />
                </label>
                <input
                  id="m-routingCode"
                  name="routingCode"
                  value={form.routingCode}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-swiftBic" className={styles.mobileLabel}>
                  Swift Code <Required />
                </label>
                <input
                  id="m-swiftBic"
                  name="swiftBic"
                  value={form.swiftBic}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-branchAddress" className={styles.mobileLabel}>
                  Bank Address, City, State <Required />
                </label>
                <input
                  id="m-branchAddress"
                  name="branchAddress"
                  value={form.branchAddress}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-bankPostalCode"
                  className={styles.mobileLabel}
                >
                  Postal code <Required />
                </label>
                <input
                  id="m-bankPostalCode"
                  name="bankPostalCode"
                  value={form.bankPostalCode}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-currency" className={styles.mobileLabel}>
                  Currency <Required />
                </label>
                <select
                  id="m-currency"
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className={styles.mobileSelect}
                  required
                >
                  <option value="">Choose Currency</option>
                  <option value="PGK">PGK — Papua New Guinean Kina</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="AUD">AUD — Australian Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-accountType" className={styles.mobileLabel}>
                  Account Type
                </label>
                <input
                  id="m-accountType"
                  name="accountType"
                  value={form.accountType}
                  onChange={handleChange}
                  className={styles.mobileInput}
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-iban" className={styles.mobileLabel}>
                  IBAN (International Bank Account Number) <Required />
                </label>
                <input
                  id="m-iban"
                  name="iban"
                  value={form.iban}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-accountName" className={styles.mobileLabel}>
                  Account Holder&apos;s Name <Required />
                </label>
                <input
                  id="m-accountName"
                  name="accountName"
                  value={form.accountName}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-accountNumber" className={styles.mobileLabel}>
                  Account Number <Required />
                </label>
                <input
                  id="m-accountNumber"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  required
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-otherBankDetails"
                  className={styles.mobileLabel}
                >
                  Any Other Details
                </label>
                <input
                  id="m-otherBankDetails"
                  name="otherBankDetails"
                  value={form.otherBankDetails}
                  onChange={handleChange}
                  className={styles.mobileInput}
                />
              </div>

              <h3
                className={styles.mobileSectionTitle}
                style={{ marginTop: 24 }}
              >
                Other Identification
              </h3>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-businessRegistrationNo"
                  className={styles.mobileLabel}
                >
                  Company Registration No
                </label>
                <input
                  id="m-businessRegistrationNo"
                  name="businessRegistrationNo"
                  value={form.businessRegistrationNo}
                  onChange={handleChange}
                  className={styles.mobileInput}
                />
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-taxId" className={styles.mobileLabel}>
                  Tax ID
                </label>
                <input
                  id="m-taxId"
                  name="taxId"
                  value={form.taxId}
                  onChange={handleChange}
                  className={styles.mobileInput}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={styles.mobileCard}>
              <h2 className={styles.mobileSectionTitle}>Other Information</h2>

              <div className={styles.mobileFieldWrap}>
                <span className={styles.mobileLabel}>
                  Does the organization have an Environmental Management System?
                </span>
                <div className={styles.mobileRadioGroup}>
                  <label
                    htmlFor="m-env-yes"
                    className={styles.mobileRadioLabel}
                  >
                    <input
                      id="m-env-yes"
                      type="radio"
                      name="environmentManagement"
                      value="yes"
                      checked={form.environmentManagement === "yes"}
                      onChange={handleChange}
                      className={styles.mobileRadio}
                    />
                    <span>Yes</span>
                  </label>
                  <label htmlFor="m-env-no" className={styles.mobileRadioLabel}>
                    <input
                      id="m-env-no"
                      type="radio"
                      name="environmentManagement"
                      value="no"
                      checked={form.environmentManagement === "no"}
                      onChange={handleChange}
                      className={styles.mobileRadio}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className={styles.mobileFieldWrap}>
                <span className={styles.mobileLabel}>
                  Does the company source any materials from entities involved
                  in forced labour or human trafficking?
                </span>
                <div className={styles.mobileRadioGroup}>
                  <label
                    htmlFor="m-labour-yes"
                    className={styles.mobileRadioLabel}
                  >
                    <input
                      id="m-labour-yes"
                      type="radio"
                      name="forcedLabourCheck"
                      value="yes"
                      checked={form.forcedLabourCheck === "yes"}
                      onChange={handleChange}
                      className={styles.mobileRadio}
                    />
                    <span>Yes</span>
                  </label>
                  <label
                    htmlFor="m-labour-no"
                    className={styles.mobileRadioLabel}
                  >
                    <input
                      id="m-labour-no"
                      type="radio"
                      name="forcedLabourCheck"
                      value="no"
                      checked={form.forcedLabourCheck === "no"}
                      onChange={handleChange}
                      className={styles.mobileRadio}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className={styles.mobileFieldWrap}>
                <label htmlFor="m-howDidYouHear" className={styles.mobileLabel}>
                  How did you know about GREEN Limited?
                </label>
                <select
                  id="m-howDidYouHear"
                  name="howDidYouHear"
                  value={form.howDidYouHear}
                  onChange={handleChange}
                  className={styles.mobileSelect}
                >
                  <option value="">Choose Option</option>
                  <option value="referral">Referral</option>
                  <option value="website">Website</option>
                  <option value="social-media">Social Media</option>
                  <option value="event">Event / Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.mobileFieldWrap}>
                <label
                  htmlFor="m-additionalNotes"
                  className={styles.mobileLabel}
                >
                  Comments / Feedback
                </label>
                <input
                  id="m-additionalNotes"
                  name="additionalNotes"
                  value={form.additionalNotes}
                  onChange={handleChange}
                  className={styles.mobileInput}
                  placeholder="Any additional information..."
                />
              </div>

              <div className={styles.mobileFieldWrap} style={{ marginTop: 20 }}>
                <label
                  htmlFor="m-declaration"
                  className={styles.mobileCheckboxLabel}
                >
                  <input
                    id="m-declaration"
                    type="checkbox"
                    name="declaration"
                    checked={form.declaration}
                    onChange={handleChange}
                    className={styles.mobileCheckbox}
                    required
                  />
                  <span>
                    I confirm and declare that the information provided in this
                    registration is true, accurate, and complete to the best of
                    my knowledge. <Required />
                  </span>
                </label>
              </div>
            </div>
          )}

          {errorMessage && (
            <p className={styles.mobileErrorMessage} role="alert">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className={styles.mobileSuccessMessage} role="status">
              {successMessage}
            </p>
          )}

          {/* Navigation Controls */}
          <div className={styles.mobileNavActions}>
            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                className={styles.mobileBackBtn}
              >
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className={styles.mobileNextBtn}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className={styles.mobileSubmitBtn}
              >
                {isLoading ? "Submitting..." : "Submit Registration"}
              </button>
            )}
          </div>
        </form>
      </div>

      <D6Chatbot />
    </main>
  );

  return (
    <FigmaPageCanvas
      desktop={desktop}
      mobile={mobile}
      nodeId="7164:3370"
      designHeight={
        step === 2
          ? 1644
          : step === 3
            ? 1475
            : step === 4
              ? 996
              : step === 1
                ? 1250
                : 1115
      }
      scaleToViewport="width"
    />
  );
};

export default SupplyChainRegistration;
