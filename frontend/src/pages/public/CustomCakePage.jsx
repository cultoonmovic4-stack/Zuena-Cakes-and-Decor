import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import {
  submitCustomCakeRequest,
  validateReferenceImage,
} from '../../services/customCakeService.js'
import {
  HeroShowcase,
  ProcessOrbit,
  InspirationGallery,
  RequestSidebar,
} from '../../components/custom-cake/CakeShowcase.jsx'
import { FLAVOUR_SWATCH } from '../../components/custom-cake/flavourSwatches.js'

const CONSULTATION_STEPS = [
  {
    number: '01',
    title: 'Share Your Vision',
    description:
      'Tell us about your event, theme, preferred cake size and design.',
  },
  {
    number: '02',
    title: "Let's Discuss the Details",
    description:
      'Our team will review your request and contact you to discuss availability, pricing and any special requirements.',
  },
  {
    number: '03',
    title: 'Confirm Your Creation',
    description:
      "Once the details are agreed upon, we'll guide you through confirmation and payment.",
  },
]

const FORM_STEPS = [
  { id: 1, label: 'Event Details', shortLabel: 'Event' },
  { id: 2, label: 'Cake Preferences', shortLabel: 'Preferences' },
  { id: 3, label: 'Design Inspiration', shortLabel: 'Inspiration' },
  { id: 4, label: 'Contact & Delivery', shortLabel: 'Contact' },
]

const OCCASION_OPTIONS = [
  'Wedding',
  'Birthday',
  'Anniversary',
  'Graduation',
  'Cultural Ceremony',
  'Baby Shower',
  'Corporate Event',
  'Other',
]

const SERVING_SIZE_OPTIONS = [
  'Less than 20',
  '20–50',
  '50–100',
  '100–200',
  '200+',
]

const BUDGET_RANGE_OPTIONS = [
  'Not sure yet',
  'Under UGX 150,000',
  'UGX 150,000 – 300,000',
  'UGX 300,000 – 600,000',
  'UGX 600,000 – 1,200,000',
  'UGX 1,200,000+',
]

const FLAVOUR_OPTIONS = [
  'Vanilla',
  'Chocolate',
  'Red Velvet',
  'Lemon',
  'Carrot',
  'Fruit Cake',
  'Other',
]

const CAKE_STYLE_OPTIONS = [
  'Classic',
  'Minimalist',
  'Modern',
  'Floral',
  'Themed',
  'Cultural',
  'Luxury',
  'Other',
]

const TIER_OPTIONS = [
  'Not sure yet',
  '1 Tier (Single Tier)',
  '2 Tiers',
  '3 Tiers',
  '4+ Tiers (Grand Statement)',
  'Cupcake Tower / Individual Portions',
]

const INITIAL_FORM_VALUES = {
  // Step 1: Event Details
  occasion: '',
  eventDate: '',
  eventLocation: '',
  servings: '',
  budgetRange: 'Not sure yet',

  // Step 2: Cake Preferences
  flavour: '',
  cakeStyle: '',
  tiers: '',
  colourPalette: '',
  dietaryRequirements: '',
  designNotes: '',

  // Step 3: Design Inspiration
  referenceImage: null,
  inspirationNotes: '',

  // Step 4: Contact & Delivery
  fullName: '',
  email: '',
  phone: '',
  fulfilmentMethod: '',
  deliveryAddress: '',
  additionalInstructions: '',
  acknowledgePolicy: false,
}

function getTodayDateString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '0 KB'
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return 'Not specified'
  const parts = dateStr.split('-')
  if (parts.length !== 3) return dateStr
  const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
  if (Number.isNaN(dateObj.getTime())) return dateStr
  return dateObj.toLocaleDateString('en-UG', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function CustomCakePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [highestCompletedStep, setHighestCompletedStep] = useState(0)
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES)
  const [errors, setErrors] = useState({})
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submissionResult, setSubmissionResult] = useState(null)

  const formCardRef = useRef(null)
  const fileInputRef = useRef(null)
  const todayStr = getTodayDateString()

  // Clean up object URL when it changes or when the component unmounts
  useEffect(() => {
    if (!imagePreviewUrl) return undefined
    return () => {
      URL.revokeObjectURL(imagePreviewUrl)
    }
  }, [imagePreviewUrl])

  const scrollFormIntoView = () => {
    if (formCardRef.current) {
      formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const updateField = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }

    if (submitError) {
      setSubmitError(null)
    }
  }

  const validateStep = (stepNumber, values = formValues) => {
    const stepErrors = {}

    if (stepNumber === 1) {
      if (!values.occasion.trim()) {
        stepErrors.occasion = 'Please select an occasion category for your celebration.'
      }

      if (!values.eventDate) {
        stepErrors.eventDate = 'Please select your event date.'
      } else if (values.eventDate < todayStr) {
        stepErrors.eventDate = 'Event date cannot be in the past. Please choose today or a future date.'
      }

      if (!values.eventLocation.trim()) {
        stepErrors.eventLocation = 'Please enter the event venue or location.'
      } else if (values.eventLocation.trim().length < 2) {
        stepErrors.eventLocation = 'Please provide a more descriptive venue or area name.'
      }

      if (!values.servings) {
        stepErrors.servings = 'Please select an estimated number of guests / servings.'
      }
    }

    if (stepNumber === 2) {
      if (!values.flavour) {
        stepErrors.flavour = 'Please select a preferred cake flavour.'
      }

      if (!values.cakeStyle) {
        stepErrors.cakeStyle = 'Please select a preferred cake style.'
      }
    }

    if (stepNumber === 3) {
      if (values.referenceImage) {
        const validation = validateReferenceImage(values.referenceImage)
        if (!validation.valid) {
          stepErrors.referenceImage = validation.error
        }
      }
    }

    if (stepNumber === 4) {
      if (!values.fullName.trim()) {
        stepErrors.fullName = 'Please enter your full name.'
      } else if (values.fullName.trim().length < 2) {
        stepErrors.fullName = 'Please enter at least 2 characters for your name.'
      }

      const emailTrimmed = values.email.trim()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailTrimmed) {
        stepErrors.email = 'Please enter your email address.'
      } else if (!emailRegex.test(emailTrimmed)) {
        stepErrors.email = 'Please enter a valid email address (e.g. name@example.com).'
      }

      const phoneTrimmed = values.phone.trim()
      const digitsOnly = phoneTrimmed.replace(/\D/g, '')
      if (!phoneTrimmed) {
        stepErrors.phone = 'Please enter your phone number.'
      } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        stepErrors.phone = 'Please enter a valid phone number (e.g. +256 705 100 010).'
      }

      if (!values.fulfilmentMethod) {
        stepErrors.fulfilmentMethod = 'Please choose collection or delivery.'
      }

      if (values.fulfilmentMethod === 'delivery' && !values.deliveryAddress.trim()) {
        stepErrors.deliveryAddress = 'Please provide the delivery address or venue directions.'
      }

      if (!values.acknowledgePolicy) {
        stepErrors.acknowledgePolicy =
          'Please confirm that you understand this request is subject to staff review and confirmation.'
      }
    }

    return stepErrors
  }

  const focusFirstErrorField = (stepErrors) => {
    const firstFieldKey = Object.keys(stepErrors)[0]
    if (!firstFieldKey) return

    requestAnimationFrame(() => {
      const target = document.getElementById(`field-${firstFieldKey}`)
      if (target && typeof target.focus === 'function') {
        target.focus()
      }
    })
  }

  const handleContinue = () => {
    const stepErrors = validateStep(currentStep)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      focusFirstErrorField(stepErrors)
      return
    }

    setErrors({})
    setHighestCompletedStep((prev) => Math.max(prev, currentStep))
    setCurrentStep((prev) => Math.min(4, prev + 1))
    scrollFormIntoView()
  }

  const handleBack = () => {
    setErrors({})
    setSubmitError(null)
    setCurrentStep((prev) => Math.max(1, prev - 1))
    scrollFormIntoView()
  }

  const handleStepClick = (targetStep) => {
    if (isSubmitting) return
    if (targetStep === currentStep) return

    // Always allow navigating backwards; allow jumping forward only if intermediate steps were completed
    if (targetStep < currentStep) {
      setErrors({})
      setSubmitError(null)
      setCurrentStep(targetStep)
      scrollFormIntoView()
      return
    }

    if (targetStep <= highestCompletedStep + 1) {
      const currentErrors = validateStep(currentStep)
      if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors)
        focusFirstErrorField(currentErrors)
        return
      }
      setErrors({})
      setHighestCompletedStep((prev) => Math.max(prev, currentStep))
      setCurrentStep(targetStep)
      scrollFormIntoView()
    }
  }

  const handleFileSelection = (file) => {
    if (!file) return

    const check = validateReferenceImage(file)
    if (!check.valid) {
      setErrors((prev) => ({
        ...prev,
        referenceImage: check.error,
      }))
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      return
    }

    setErrors((prev) => {
      const next = { ...prev }
      delete next.referenceImage
      return next
    })

    setFormValues((prev) => ({
      ...prev,
      referenceImage: file,
    }))
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelection(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDraggingOver) {
      setIsDraggingOver(true)
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)

    const droppedFile = e.dataTransfer?.files?.[0]
    if (droppedFile) {
      handleFileSelection(droppedFile)
    }
  }

  const handleRemoveImage = () => {
    setFormValues((prev) => ({
      ...prev,
      referenceImage: null,
    }))
    setImagePreviewUrl(null)
    setErrors((prev) => {
      const next = { ...prev }
      delete next.referenceImage
      return next
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleTriggerFileReplace = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    // If user presses Enter on an earlier step, treat it as Continue
    if (currentStep < 4) {
      handleContinue()
      return
    }

    // Validate all steps before final submission
    for (let step = 1; step <= 4; step += 1) {
      const stepErrors = validateStep(step)
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors)
        if (step !== currentStep) {
          setCurrentStep(step)
        }
        focusFirstErrorField(stepErrors)
        return
      }
    }

    setErrors({})
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const result = await submitCustomCakeRequest(formValues)
      setSubmissionResult(result)
      scrollFormIntoView()
    } catch (err) {
      setSubmitError(
        err?.message ||
          'We encountered an issue while submitting your custom cake request. Please review your details and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStartNewRequest = () => {
    setFormValues(INITIAL_FORM_VALUES)
    setImagePreviewUrl(null)
    setErrors({})
    setSubmitError(null)
    setSubmissionResult(null)
    setCurrentStep(1)
    setHighestCompletedStep(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    scrollFormIntoView()
  }

  const inputBaseClass =
    'w-full min-w-0 rounded-sm bg-[#141210] border px-4 py-3 text-sm text-brand-white placeholder-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold'
  const getInputBorderClass = (fieldName) =>
    errors[fieldName]
      ? 'border-red-400/80 focus-visible:border-red-400'
      : 'border-bronze/35 hover:border-bronze/60 focus-visible:border-primary-gold'

  return (
    <div className="w-full overflow-x-clip font-sans pb-16">
      {/* SECTION A — Hero */}
      <HeroShowcase />

      {/* SECTION B — Custom Consultation Process */}
      <ProcessOrbit
        steps={CONSULTATION_STEPS}
        heading="Custom Consultation Process"
        intro="Your dream cake begins with an idea. Tell us about your occasion, preferred flavours and design inspiration. Our team will review your request and get in touch to discuss the details."
        notice="Submitting a custom cake request does not constitute a confirmed booking or payment. All bespoke orders are reviewed personally by our team to confirm date availability, design feasibility, and final quotation."
      />

      <InspirationGallery />

      {/* SECTION C — Interactive Multi-Step Request Form OR Submission Confirmation */}
      <div id="request-form" ref={formCardRef} className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4">
        {!submissionResult && (
          <div className="mb-8 sm:mb-10 max-w-2xl" data-aos="fade-up">
            <p className="flex items-center gap-3 m-0 mb-4 text-xs uppercase tracking-[0.25em] text-champagne-gold font-medium">
              <span aria-hidden="true" className="inline-block w-8 h-px bg-primary-gold" />
              Request Form
            </p>
            <h2 className="m-0 mb-3 text-3xl sm:text-4xl font-serif font-semibold text-primary-gold">
              Tell Us About Your Cake
            </h2>
            <p className="m-0 text-sm sm:text-base text-gray-300 leading-relaxed">
              Four short steps. You can go back at any time and your answers will be kept.
            </p>
          </div>
        )}
        {submissionResult ? (
          /* SECTION 5 — Submission Confirmation Screen */
          <section
            aria-labelledby="confirmation-heading"
            aria-live="polite"
            className="bg-[#1A1815] border border-primary-gold/40 rounded-sm p-6 sm:p-10 mb-8"
          >
            <div className="max-w-2xl mx-auto text-center">
              {/* Subtle Luxury Success Icon */}
              <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <div className="relative w-14 h-14 rounded-sm bg-[#141210] border border-primary-gold flex items-center justify-center text-primary-gold">
                  <svg
                    aria-hidden="true"
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <span className="inline-block text-[11px] uppercase tracking-[0.22em] text-champagne-gold font-mono mb-2">
                Consultation Request Received
              </span>

              <h2
                id="confirmation-heading"
                className="text-2xl sm:text-3xl font-serif font-semibold text-primary-gold mb-3"
              >
                Your Vision Is in Our Hands
              </h2>

              <p className="text-sm sm:text-base text-brand-white font-medium mb-2">
                Thank you for sharing your celebration with us. Your custom cake request has been submitted successfully.
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                Our team will review your details and contact you to discuss your design, availability and quotation.
              </p>

              {/* Reference Number (when provided by backend) */}
              {submissionResult.referenceNumber && (
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-sm bg-[#141210] border border-bronze/40 text-xs mb-6">
                  <span className="text-gray-400">Request Reference:</span>
                  <span className="font-mono font-semibold text-gold-highlight">
                    {submissionResult.referenceNumber}
                  </span>
                </div>
              )}

              {/* Honest Backend Preview Notice when no backend API is configured yet */}
              {submissionResult.mode === 'preview' && (
                <div
                  role="status"
                  className="text-left px-5 py-4 mb-6 border border-white/15 border-l-4 border-l-primary-gold bg-[#141210] text-sm text-gray-300 leading-relaxed"
                >
                  <p className="m-0 mb-1 font-semibold text-gold-highlight">
                    Online submission is not yet connected
                  </p>
                  <p className="m-0 text-gray-400">
                    This request has been checked but not yet delivered to our team. To make sure we receive it, please call{' '}
                    <a href="tel:+256705100010" className="text-champagne-gold hover:text-gold-highlight underline underline-offset-2">
                      +256 705 100 010
                    </a>{' '}
                    or email{' '}
                    <a href="mailto:info@zuenacakes.com" className="text-champagne-gold hover:text-gold-highlight underline underline-offset-2">
                      info@zuenacakes.com
                    </a>
                    .
                  </p>
                </div>
              )}

              {/* Submitted Specification Summary */}
              <div className="text-left bg-[#141210] border border-white/10 rounded-sm p-5 sm:p-6 mb-6">
                <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-champagne-gold mb-4 pb-2 border-b border-white/10">
                  Request Summary
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
                  <div>
                    <dt className="text-gray-400">Occasion &amp; Date</dt>
                    <dd className="text-brand-white font-medium mt-0.5 break-words">
                      {submissionResult.summary.occasion} &bull;{' '}
                      {formatDisplayDate(submissionResult.summary.eventDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Event Location &amp; Guests</dt>
                    <dd className="text-brand-white font-medium mt-0.5 break-words">
                      {submissionResult.summary.eventLocation} ({submissionResult.summary.servings} servings)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Cake Flavour &amp; Style</dt>
                    <dd className="text-brand-white font-medium mt-0.5 break-words">
                      {submissionResult.summary.flavour} &bull; {submissionResult.summary.cakeStyle}
                      {submissionResult.summary.tiers ? ` (${submissionResult.summary.tiers})` : ''}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Fulfilment Preference</dt>
                    <dd className="text-brand-white font-medium mt-0.5 break-words">
                      {submissionResult.summary.fulfilmentMethod === 'delivery'
                        ? `Delivery — ${submissionResult.summary.deliveryAddress}`
                        : 'Collection from Atelier (Kiwatule Rd, Kampala)'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Customer Contact</dt>
                    <dd className="text-brand-white font-medium mt-0.5 break-words">
                      {submissionResult.summary.fullName} &bull; {submissionResult.summary.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Reference Image</dt>
                    <dd className="text-brand-white font-medium mt-0.5 break-words">
                      {submissionResult.summary.referenceImage
                        ? submissionResult.summary.referenceImage.name
                        : 'No reference image attached'}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Clear Next-Step Information */}
              <div className="text-left bg-[#141210] border border-bronze/25 rounded-sm p-5 mb-8">
                <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-primary-gold mb-3">
                  What Happens Next
                </h3>
                <ul className="space-y-2 text-xs text-gray-300 leading-relaxed list-none p-0 m-0">
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary-gold font-mono font-semibold">01.</span>
                    <span>
                      Our cake decorators review your event date, serving size, design notes, and reference inspiration.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary-gold font-mono font-semibold">02.</span>
                    <span>
                      We reach out via phone ({submissionResult.summary.phone}) or email ({submissionResult.summary.email}) to discuss flavour pairings, bespoke details, and your tailored quotation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary-gold font-mono font-semibold">03.</span>
                    <span>
                      Your booking is formally confirmed only after you approve the final design and quotation with our team.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  to="/creations"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-gold hover:bg-gold-highlight text-dark-canvas font-semibold text-xs sm:text-sm rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1815]"
                >
                  <span>Return to Creations Catalogue</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <button
                  type="button"
                  onClick={handleStartNewRequest}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 bg-transparent hover:bg-white/5 text-gray-300 hover:text-gold-highlight border border-bronze/40 font-medium text-xs sm:text-sm rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          </section>
        ) : (
          /* Interactive Multi-Step Form Card */
          <section
            aria-label="Custom Cake Multi-Step Request Form"
            className="mb-8 overflow-hidden rounded-sm sm:rounded-sm border border-bronze/35 bg-[#1A1815] lg:grid lg:grid-cols-[300px_1fr]"
          >
            <RequestSidebar
              currentStep={currentStep}
              highestCompletedStep={highestCompletedStep}
              values={formValues}
            />
            <div className="p-5 sm:p-8 lg:p-10 min-w-0">
            {/* Progress Indicator Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono uppercase tracking-[0.18em] text-champagne-gold">
                  Step {currentStep} of {FORM_STEPS.length} &mdash; {FORM_STEPS[currentStep - 1].label}
                </span>
                <span className="text-xs text-gray-400">
                  * Required fields
                </span>
              </div>

              {/* Step Progress Bar & Interactive Step Pills */}
              <nav aria-label="Form progress steps" className="lg:hidden">
                <ol className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 list-none p-0 m-0">
                  {FORM_STEPS.map((step) => {
                    const isCurrent = step.id === currentStep
                    const isCompleted = step.id < currentStep || step.id <= highestCompletedStep
                    const isClickable =
                      !isSubmitting && (step.id < currentStep || step.id <= highestCompletedStep + 1)

                    return (
                      <li key={step.id}>
                        <button
                          type="button"
                          onClick={() => handleStepClick(step.id)}
                          disabled={!isClickable}
                          aria-current={isCurrent ? 'step' : undefined}
                          className={`w-full text-left p-2.5 sm:p-3 rounded-sm border transition-all flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold ${
                            isCurrent
                              ? 'bg-[#141210] border-primary-gold text-brand-white'
                              : isCompleted
                              ? 'bg-[#141210]/70 border-bronze/40 text-gray-200 hover:border-primary-gold/60 cursor-pointer'
                              : 'bg-[#141210]/40 border-white/10 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-sm text-[11px] font-mono font-semibold flex items-center justify-center shrink-0 ${
                              isCurrent
                                ? 'bg-primary-gold text-dark-canvas'
                                : isCompleted
                                ? 'bg-bronze/30 text-gold-highlight border border-primary-gold/50'
                                : 'bg-white/5 text-gray-500 border border-white/10'
                            }`}
                          >
                            {isCompleted && !isCurrent ? (
                              <svg
                                aria-hidden="true"
                                className="w-3.5 h-3.5 text-primary-gold"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              `0${step.id}`
                            )}
                          </span>
                          <span className="truncate text-xs font-medium">
                            <span className="hidden sm:inline">{step.label}</span>
                            <span className="sm:hidden">{step.shortLabel}</span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </nav>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1: EVENT DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-serif font-semibold text-primary-gold mb-1.5">
                      Step 1: Event Details
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Tell us about the occasion, celebration date, venue location, and expected guest count.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Occasion Category */}
                    <div>
                      <label
                        htmlFor="field-occasion"
                        className="block text-[13px] font-medium text-gray-100 mb-2"
                      >
                        Occasion Category <span className="text-primary-gold">*</span>
                      </label>
                      <select
                        id="field-occasion"
                        name="occasion"
                        value={formValues.occasion}
                        onChange={(e) => updateField('occasion', e.target.value)}
                        aria-required="true"
                        aria-invalid={Boolean(errors.occasion)}
                        aria-describedby={errors.occasion ? 'error-occasion' : undefined}
                        className={`${inputBaseClass} ${getInputBorderClass('occasion')}`}
                      >
                        <option value="" className="bg-[#141210] text-gray-400">
                          Select an occasion...
                        </option>
                        {OCCASION_OPTIONS.map((occasion) => (
                          <option
                            key={occasion}
                            value={occasion}
                            className="bg-[#141210] text-brand-white"
                          >
                            {occasion}
                          </option>
                        ))}
                      </select>
                      {errors.occasion && (
                        <p
                          id="error-occasion"
                          role="alert"
                          className="mt-1.5 text-xs text-red-400"
                        >
                          {errors.occasion}
                        </p>
                      )}
                    </div>

                    {/* Event Date */}
                    <div>
                      <label
                        htmlFor="field-eventDate"
                        className="block text-[13px] font-medium text-gray-100 mb-2"
                      >
                        Event Date <span className="text-primary-gold">*</span>
                      </label>
                      <input
                        id="field-eventDate"
                        name="eventDate"
                        type="date"
                        min={todayStr}
                        value={formValues.eventDate}
                        onChange={(e) => updateField('eventDate', e.target.value)}
                        aria-required="true"
                        aria-invalid={Boolean(errors.eventDate)}
                        aria-describedby={
                          errors.eventDate ? 'error-eventDate hint-eventDate' : 'hint-eventDate'
                        }
                        className={`${inputBaseClass} ${getInputBorderClass('eventDate')}`}
                      />
                      <p id="hint-eventDate" className="mt-1 text-[11px] text-gray-400">
                        Select today or a future celebration date.
                      </p>
                      {errors.eventDate && (
                        <p
                          id="error-eventDate"
                          role="alert"
                          className="mt-1 text-xs text-red-400"
                        >
                          {errors.eventDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Event Location */}
                  <div>
                    <label
                      htmlFor="field-eventLocation"
                      className="block text-[13px] font-medium text-gray-100 mb-2"
                    >
                      Event Location <span className="text-primary-gold">*</span>
                    </label>
                    <input
                      id="field-eventLocation"
                      name="eventLocation"
                      type="text"
                      placeholder="e.g. Serena Hotel Kampala, Munyonyo, Kololo, or Home Venue"
                      value={formValues.eventLocation}
                      onChange={(e) => updateField('eventLocation', e.target.value)}
                      aria-required="true"
                      aria-invalid={Boolean(errors.eventLocation)}
                      aria-describedby={errors.eventLocation ? 'error-eventLocation' : undefined}
                      className={`${inputBaseClass} ${getInputBorderClass('eventLocation')}`}
                    />
                    {errors.eventLocation && (
                      <p
                        id="error-eventLocation"
                        role="alert"
                        className="mt-1.5 text-xs text-red-400"
                      >
                        {errors.eventLocation}
                      </p>
                    )}
                  </div>

                  {/* Estimated Number of Guests / Servings */}
                  <fieldset
                    aria-invalid={Boolean(errors.servings)}
                    aria-describedby={errors.servings ? 'error-servings' : undefined}
                    className="border-0 p-0 min-w-0"
                  >
                    <legend className="block text-[13px] font-medium text-gray-100 mb-3">
                      Estimated Number of Guests / Servings <span className="text-primary-gold">*</span>
                    </legend>
                    <div
                      id="field-servings"
                      tabIndex={-1}
                      className="grid grid-cols-2 sm:grid-cols-5 gap-2.5"
                    >
                      {SERVING_SIZE_OPTIONS.map((option) => {
                        const isSelected = formValues.servings === option
                        return (
                          <label
                            key={option}
                            className={`flex items-center justify-center text-center px-3 py-3 rounded-sm border text-xs font-medium cursor-pointer transition-all focus-within:ring-2 focus-within:ring-primary-gold ${
                              isSelected
                                ? 'bg-primary-gold/15 border-primary-gold text-gold-highlight'
                                : 'bg-[#141210] border-bronze/30 text-gray-300 hover:border-bronze/60 hover:text-brand-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="servings"
                              value={option}
                              checked={isSelected}
                              onChange={() => updateField('servings', option)}
                              className="sr-only"
                            />
                            <span>{option}</span>
                          </label>
                        )
                      })}
                    </div>
                    {errors.servings && (
                      <p
                        id="error-servings"
                        role="alert"
                        className="mt-2 text-xs text-red-400"
                      >
                        {errors.servings}
                      </p>
                    )}
                  </fieldset>

                  {/* Budget Range (Optional) */}
                  <div>
                    <label
                      htmlFor="field-budgetRange"
                      className="block text-[13px] font-medium text-gray-100 mb-2"
                    >
                      Approximate Budget Range{' '}
                      <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <select
                      id="field-budgetRange"
                      name="budgetRange"
                      value={formValues.budgetRange}
                      onChange={(e) => updateField('budgetRange', e.target.value)}
                      aria-describedby="hint-budgetRange"
                      className={`${inputBaseClass} ${getInputBorderClass('budgetRange')}`}
                    >
                      {BUDGET_RANGE_OPTIONS.map((budget) => (
                        <option
                          key={budget}
                          value={budget}
                          className="bg-[#141210] text-brand-white"
                        >
                          {budget}
                        </option>
                      ))}
                    </select>
                    <p id="hint-budgetRange" className="mt-1.5 text-[11px] text-gray-400">
                      Sharing an approximate budget helps our bakers suggest appropriate tier configurations and decorative finishes, or select &ldquo;Not sure yet&rdquo;.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2: CAKE PREFERENCES */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-serif font-semibold text-primary-gold mb-1.5">
                      Step 2: Cake Preferences
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Select your preferred cake flavour, artistic style, tier structure, and any dietary requirements.
                    </p>
                  </div>

                  {/* Preferred Cake Flavour */}
                  <fieldset
                    aria-invalid={Boolean(errors.flavour)}
                    aria-describedby={errors.flavour ? 'error-flavour' : undefined}
                    className="border-0 p-0 min-w-0"
                  >
                    <legend className="block text-[13px] font-medium text-gray-100 mb-3">
                      Preferred Cake Flavour <span className="text-primary-gold">*</span>
                    </legend>
                    <div
                      id="field-flavour"
                      tabIndex={-1}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                    >
                      {FLAVOUR_OPTIONS.map((option) => {
                        const isSelected = formValues.flavour === option
                        return (
                          <label
                            key={option}
                            className={`flex items-center justify-center text-center px-3 py-3 rounded-sm border text-xs font-medium cursor-pointer transition-all focus-within:ring-2 focus-within:ring-primary-gold ${
                              isSelected
                                ? 'bg-primary-gold/15 border-primary-gold text-gold-highlight'
                                : 'bg-[#141210] border-bronze/30 text-gray-300 hover:border-bronze/60 hover:text-brand-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="flavour"
                              value={option}
                              checked={isSelected}
                              onChange={() => updateField('flavour', option)}
                              className="sr-only"
                            />
                            <span className="inline-flex items-center gap-2">
                              <span aria-hidden="true" className="w-3 h-3 rounded-sm border border-white/30" style={{ backgroundColor: FLAVOUR_SWATCH[option] }} />
                              {option}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                    {errors.flavour && (
                      <p
                        id="error-flavour"
                        role="alert"
                        className="mt-2 text-xs text-red-400"
                      >
                        {errors.flavour}
                      </p>
                    )}
                  </fieldset>

                  {/* Cake Style */}
                  <fieldset
                    aria-invalid={Boolean(errors.cakeStyle)}
                    aria-describedby={errors.cakeStyle ? 'error-cakeStyle' : undefined}
                    className="border-0 p-0 min-w-0"
                  >
                    <legend className="block text-[13px] font-medium text-gray-100 mb-3">
                      Cake Style <span className="text-primary-gold">*</span>
                    </legend>
                    <div
                      id="field-cakeStyle"
                      tabIndex={-1}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                    >
                      {CAKE_STYLE_OPTIONS.map((option) => {
                        const isSelected = formValues.cakeStyle === option
                        return (
                          <label
                            key={option}
                            className={`flex items-center justify-center text-center px-3 py-3 rounded-sm border text-xs font-medium cursor-pointer transition-all focus-within:ring-2 focus-within:ring-primary-gold ${
                              isSelected
                                ? 'bg-primary-gold/15 border-primary-gold text-gold-highlight'
                                : 'bg-[#141210] border-bronze/30 text-gray-300 hover:border-bronze/60 hover:text-brand-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="cakeStyle"
                              value={option}
                              checked={isSelected}
                              onChange={() => updateField('cakeStyle', option)}
                              className="sr-only"
                            />
                            <span>{option}</span>
                          </label>
                        )
                      })}
                    </div>
                    {errors.cakeStyle && (
                      <p
                        id="error-cakeStyle"
                        role="alert"
                        className="mt-2 text-xs text-red-400"
                      >
                        {errors.cakeStyle}
                      </p>
                    )}
                  </fieldset>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Number of Tiers (Optional) */}
                    <div>
                      <label
                        htmlFor="field-tiers"
                        className="block text-[13px] font-medium text-gray-100 mb-2"
                      >
                        Number of Tiers{' '}
                        <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <select
                        id="field-tiers"
                        name="tiers"
                        value={formValues.tiers}
                        onChange={(e) => updateField('tiers', e.target.value)}
                        className={`${inputBaseClass} ${getInputBorderClass('tiers')}`}
                      >
                        <option value="" className="bg-[#141210] text-gray-400">
                          Select tier preference...
                        </option>
                        {TIER_OPTIONS.map((tier) => (
                          <option
                            key={tier}
                            value={tier}
                            className="bg-[#141210] text-brand-white"
                          >
                            {tier}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Colour Palette */}
                    <div>
                      <label
                        htmlFor="field-colourPalette"
                        className="block text-[13px] font-medium text-gray-100 mb-2"
                      >
                        Preferred Colour Palette{' '}
                        <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="field-colourPalette"
                        name="colourPalette"
                        type="text"
                        placeholder="e.g. Ivory, Champagne Gold & Soft Blush"
                        value={formValues.colourPalette}
                        onChange={(e) => updateField('colourPalette', e.target.value)}
                        className={`${inputBaseClass} ${getInputBorderClass('colourPalette')}`}
                      />
                    </div>
                  </div>

                  {/* Dietary Requirements or Allergies */}
                  <div>
                    <label
                      htmlFor="field-dietaryRequirements"
                      className="block text-[13px] font-medium text-gray-100 mb-2"
                    >
                      Dietary Requirements or Allergies{' '}
                      <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="field-dietaryRequirements"
                      name="dietaryRequirements"
                      type="text"
                      placeholder="e.g. Nut-free, eggless sponge, reduced sugar, dairy sensitivity"
                      value={formValues.dietaryRequirements}
                      onChange={(e) => updateField('dietaryRequirements', e.target.value)}
                      className={`${inputBaseClass} ${getInputBorderClass('dietaryRequirements')}`}
                    />
                  </div>

                  {/* Additional Design Notes */}
                  <div>
                    <label
                      htmlFor="field-designNotes"
                      className="block text-[13px] font-medium text-gray-100 mb-2"
                    >
                      Additional Design Notes{' '}
                      <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="field-designNotes"
                      name="designNotes"
                      rows={3}
                      placeholder="Share any cake message/inscription, multi-tier flavour combinations, filling preferences, or custom topper requests..."
                      value={formValues.designNotes}
                      onChange={(e) => updateField('designNotes', e.target.value)}
                      className={`${inputBaseClass} ${getInputBorderClass('designNotes')} resize-y`}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: DESIGN INSPIRATION */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-serif font-semibold text-primary-gold mb-1.5">
                      Show Us Your Inspiration
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      Have a design in mind? Upload a reference image, describe your theme, or tell us about the little details that would make your cake special.
                    </p>
                  </div>

                  {/* Reference Image Upload Area */}
                  <div>
                    <label
                      htmlFor="field-referenceImage"
                      className="block text-[13px] font-medium text-gray-100 mb-2"
                    >
                      Reference Image Upload{' '}
                      <span className="text-gray-400 font-normal">(Optional &bull; PNG or JPEG, max 5 MB)</span>
                    </label>

                    <input
                      ref={fileInputRef}
                      id="field-referenceImage"
                      name="referenceImage"
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={handleFileInputChange}
                      aria-describedby={
                        errors.referenceImage
                          ? 'error-referenceImage hint-referenceImage'
                          : 'hint-referenceImage'
                      }
                      className="sr-only"
                    />

                    {!formValues.referenceImage ? (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={handleTriggerFileReplace}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleTriggerFileReplace()
                          }
                        }}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        aria-label="Upload reference image (PNG or JPEG up to 5 megabytes)"
                        className={`rounded-sm border-2 border-dashed p-6 sm:p-8 text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold ${
                          isDraggingOver
                            ? 'border-primary-gold bg-primary-gold/10'
                            : errors.referenceImage
                            ? 'border-red-400/70 bg-[#141210]'
                            : 'border-bronze/40 hover:border-primary-gold/70 bg-[#141210]'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-sm bg-bronze/20 border border-bronze/40 flex items-center justify-center mx-auto mb-3 text-primary-gold">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.6}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm text-brand-white font-medium mb-1">
                          Drag and drop your inspiration photo here, or{' '}
                          <span className="text-primary-gold underline underline-offset-4">
                            browse files
                          </span>
                        </p>
                        <p id="hint-referenceImage" className="text-[11px] text-gray-400">
                          Accepted formats: PNG, JPG, JPEG &bull; Maximum file size: 5 MB
                        </p>
                      </div>
                    ) : (
                      /* Selected Image Preview Card */
                      <div className="bg-[#141210] border border-bronze/40 rounded-sm p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          {imagePreviewUrl && (
                            <div className="w-full sm:w-36 h-44 sm:h-36 rounded-sm overflow-hidden bg-black/40 border border-white/10 shrink-0 flex items-center justify-center">
                              <img
                                src={imagePreviewUrl}
                                alt={`Reference preview: ${formValues.referenceImage.name}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0 text-center sm:text-left">
                            <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-champagne-gold mb-1">
                              Reference Image Attached
                            </span>
                            <p className="text-sm font-medium text-brand-white truncate mb-1">
                              {formValues.referenceImage.name}
                            </p>
                            <p className="text-xs text-gray-400 mb-4">
                              {formatFileSize(formValues.referenceImage.size)} &bull;{' '}
                              {formValues.referenceImage.type === 'image/png' ? 'PNG Image' : 'JPEG Image'}
                            </p>

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                              <button
                                type="button"
                                onClick={handleTriggerFileReplace}
                                className="px-3.5 py-2 rounded-sm bg-bronze/20 hover:bg-bronze/30 text-gold-highlight border border-bronze/40 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                              >
                                Replace Image
                              </button>
                              <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="px-3.5 py-2 rounded-sm bg-transparent hover:bg-red-500/10 text-gray-300 hover:text-red-300 border border-white/15 hover:border-red-400/40 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                              >
                                Remove Image
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {errors.referenceImage && (
                      <p
                        id="error-referenceImage"
                        role="alert"
                        className="mt-2 text-xs text-red-400"
                      >
                        {errors.referenceImage}
                      </p>
                    )}
                  </div>

                  {/* Additional Design Inspiration Textarea */}
                  <div>
                    <label
                      htmlFor="field-inspirationNotes"
                      className="block text-[13px] font-medium text-gray-100 mb-2"
                    >
                      Theme &amp; Design Inspiration Details{' '}
                      <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="field-inspirationNotes"
                      name="inspirationNotes"
                      rows={4}
                      placeholder="Describe your celebration theme, floral arrangements, cultural attire colours (e.g. Gomesi / Mushanana palette), sugar flowers, gold leaf accents, or what you love most about your reference photo..."
                      value={formValues.inspirationNotes}
                      onChange={(e) => updateField('inspirationNotes', e.target.value)}
                      className={`${inputBaseClass} ${getInputBorderClass('inspirationNotes')} resize-y`}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT AND DELIVERY */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-serif font-semibold text-primary-gold mb-1.5">
                      Step 4: Contact &amp; Delivery
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Provide your contact details and let us know whether you prefer atelier collection or venue delivery.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="field-fullName"
                      className="block text-[13px] font-medium text-gray-100 mb-2"
                    >
                      Full Name <span className="text-primary-gold">*</span>
                    </label>
                    <input
                      id="field-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={formValues.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      aria-required="true"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                      className={`${inputBaseClass} ${getInputBorderClass('fullName')}`}
                    />
                    {errors.fullName && (
                      <p
                        id="error-fullName"
                        role="alert"
                        className="mt-1.5 text-xs text-red-400"
                      >
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="field-email"
                        className="block text-[13px] font-medium text-gray-100 mb-2"
                      >
                        Email Address <span className="text-primary-gold">*</span>
                      </label>
                      <input
                        id="field-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formValues.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        aria-required="true"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={`${inputBaseClass} ${getInputBorderClass('email')}`}
                      />
                      {errors.email && (
                        <p
                          id="error-email"
                          role="alert"
                          className="mt-1.5 text-xs text-red-400"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="field-phone"
                        className="block text-[13px] font-medium text-gray-100 mb-2"
                      >
                        Phone Number <span className="text-primary-gold">*</span>
                      </label>
                      <input
                        id="field-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+256 700 000 000"
                        value={formValues.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        aria-required="true"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        className={`${inputBaseClass} ${getInputBorderClass('phone')}`}
                      />
                      {errors.phone && (
                        <p
                          id="error-phone"
                          role="alert"
                          className="mt-1.5 text-xs text-red-400"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Collection or Delivery Preference */}
                  <fieldset
                    aria-invalid={Boolean(errors.fulfilmentMethod)}
                    aria-describedby={
                      errors.fulfilmentMethod ? 'error-fulfilmentMethod' : undefined
                    }
                    className="border-0 p-0 min-w-0"
                  >
                    <legend className="block text-[13px] font-medium text-gray-100 mb-3">
                      Collection or Delivery Preference <span className="text-primary-gold">*</span>
                    </legend>
                    <div
                      id="field-fulfilmentMethod"
                      tabIndex={-1}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      <label
                        className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all focus-within:ring-2 focus-within:ring-primary-gold ${
                          formValues.fulfilmentMethod === 'collection'
                            ? 'bg-primary-gold/15 border-primary-gold text-brand-white'
                            : 'bg-[#141210] border-bronze/30 text-gray-300 hover:border-bronze/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name="fulfilmentMethod"
                          value="collection"
                          checked={formValues.fulfilmentMethod === 'collection'}
                          onChange={() => updateField('fulfilmentMethod', 'collection')}
                          className="mt-1 accent-[#DEAC4B]"
                        />
                        <div>
                          <span className="block text-xs sm:text-sm font-semibold text-gold-highlight">
                            Collection from Atelier
                          </span>
                          <span className="block text-xs text-gray-400 mt-0.5">
                            Pick up directly from our studio on Kiwatule Rd, Kampala.
                          </span>
                        </div>
                      </label>

                      <label
                        className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all focus-within:ring-2 focus-within:ring-primary-gold ${
                          formValues.fulfilmentMethod === 'delivery'
                            ? 'bg-primary-gold/15 border-primary-gold text-brand-white'
                            : 'bg-[#141210] border-bronze/30 text-gray-300 hover:border-bronze/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name="fulfilmentMethod"
                          value="delivery"
                          checked={formValues.fulfilmentMethod === 'delivery'}
                          onChange={() => updateField('fulfilmentMethod', 'delivery')}
                          className="mt-1 accent-[#DEAC4B]"
                        />
                        <div>
                          <span className="block text-xs sm:text-sm font-semibold text-gold-highlight">
                            Venue / Home Delivery
                          </span>
                          <span className="block text-xs text-gray-400 mt-0.5">
                            Delivered to your celebration venue (delivery fee confirmed upon review).
                          </span>
                        </div>
                      </label>
                    </div>
                    {errors.fulfilmentMethod && (
                      <p
                        id="error-fulfilmentMethod"
                        role="alert"
                        className="mt-2 text-xs text-red-400"
                      >
                        {errors.fulfilmentMethod}
                      </p>
                    )}
                  </fieldset>

                  {/* Conditional Delivery Address Field */}
                  {formValues.fulfilmentMethod === 'delivery' && (
                    <div className="p-4 sm:p-5 rounded-sm bg-[#141210] border border-bronze/35">
                      <label
                        htmlFor="field-deliveryAddress"
                        className="block text-[13px] font-medium text-gray-100 mb-2"
                      >
                        Delivery Address / Venue Directions <span className="text-primary-gold">*</span>
                      </label>
                      <input
                        id="field-deliveryAddress"
                        name="deliveryAddress"
                        type="text"
                        placeholder="Enter street address, venue name, neighbourhood, and key landmarks..."
                        value={formValues.deliveryAddress}
                        onChange={(e) => updateField('deliveryAddress', e.target.value)}
                        aria-required="true"
                        aria-invalid={Boolean(errors.deliveryAddress)}
                        aria-describedby={
                          errors.deliveryAddress
                            ? 'error-deliveryAddress hint-deliveryAddress'
                            : 'hint-deliveryAddress'
                        }
                        className={`${inputBaseClass} ${getInputBorderClass('deliveryAddress')}`}
                      />
                      <p id="hint-deliveryAddress" className="mt-1.5 text-[11px] text-gray-400">
                        Our team will confirm delivery availability, timing, and transport fees for your location.
                      </p>
                      {errors.deliveryAddress && (
                        <p
                          id="error-deliveryAddress"
                          role="alert"
                          className="mt-1.5 text-xs text-red-400"
                        >
                          {errors.deliveryAddress}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Additional Instructions */}
                  <div>
                    <label
                      htmlFor="field-additionalInstructions"
                      className="block text-[13px] font-medium text-gray-100 mb-2"
                    >
                      Additional Instructions{' '}
                      <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="field-additionalInstructions"
                      name="additionalInstructions"
                      rows={3}
                      placeholder="Preferred time for our team to call you, venue setup times, or any other helpful notes..."
                      value={formValues.additionalInstructions}
                      onChange={(e) => updateField('additionalInstructions', e.target.value)}
                      className={`${inputBaseClass} ${getInputBorderClass('additionalInstructions')} resize-y`}
                    />
                  </div>

                  {/* Confirmation Checkbox */}
                  <div className="p-4 rounded-sm bg-[#141210] border border-bronze/30">
                    <label
                      htmlFor="field-acknowledgePolicy"
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <input
                        id="field-acknowledgePolicy"
                        name="acknowledgePolicy"
                        type="checkbox"
                        checked={formValues.acknowledgePolicy}
                        onChange={(e) => updateField('acknowledgePolicy', e.target.checked)}
                        aria-required="true"
                        aria-invalid={Boolean(errors.acknowledgePolicy)}
                        aria-describedby={
                          errors.acknowledgePolicy ? 'error-acknowledgePolicy' : undefined
                        }
                        className="mt-1 w-4 h-4 rounded accent-[#DEAC4B] shrink-0"
                      />
                      <span className="text-xs text-gray-300 leading-relaxed">
                        I understand that submitting this custom cake request is an enquiry subject to staff review and confirmation, and does not constitute an automatic booking or payment.{' '}
                        <span className="text-primary-gold">*</span>
                      </span>
                    </label>
                    {errors.acknowledgePolicy && (
                      <p
                        id="error-acknowledgePolicy"
                        role="alert"
                        className="mt-2 text-xs text-red-400"
                      >
                        {errors.acknowledgePolicy}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Submission Error Banner */}
              {submitError && (
                <div
                  role="alert"
                  className="mt-6 p-4 rounded-sm bg-red-950/50 border border-red-400/60 text-xs text-red-200 flex items-start gap-3"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-red-300 mb-0.5">
                      Submission Could Not Be Completed
                    </p>
                    <p className="m-0 leading-relaxed">{submitError}</p>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls (Back / Continue / Submit) */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="px-5 py-3 rounded-sm bg-transparent hover:bg-white/5 text-gray-300 hover:text-gold-highlight border border-bronze/40 text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                  >
                    &larr; Back to Step {currentStep - 1}
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="px-6 py-3 rounded-sm bg-primary-gold hover:bg-gold-highlight text-dark-canvas font-semibold text-xs sm:text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1815]"
                  >
                    Continue to {FORM_STEPS[currentStep].label} &rarr;
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-sm bg-primary-gold hover:bg-gold-highlight text-dark-canvas font-semibold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1815]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 animate-spin text-dark-canvas"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <span>Submit Custom Cake Request</span>
                    )}
                  </button>
                )}
              </div>
            </form>
            </div>
          </section>
        )}
      </div>

      {/* Bottom Return Link */}
      <div className="text-center">
        <Link
          to="/creations"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary-gold transition-colors py-1 px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Return to Our Creations Catalogue</span>
        </Link>
      </div>
    </div>
  )
}
