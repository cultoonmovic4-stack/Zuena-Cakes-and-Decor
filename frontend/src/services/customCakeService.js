/**
 * Custom Cake Request Submission Service
 *
 * Provides a clean abstraction layer between the Custom Cake Request UI
 * and the planned Laravel REST API (Phase 7/8).
 *
 * - When `VITE_CUSTOM_CAKE_API_URL` (or `VITE_API_BASE_URL`) is configured,
 *   requests are sent as `multipart/form-data` via `fetch` to the backend endpoint.
 * - When no backend endpoint is configured (current frontend-first development phase),
 *   the service validates the payload structure and completes in Frontend Preview Mode
 *   without inventing fake endpoints or pretending records are stored in MySQL.
 */

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg']
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

/**
 * Resolve the configured custom cake request endpoint if available.
 * Returns null when no backend environment variable is configured.
 */
export function getCustomCakeApiEndpoint() {
  const explicitEndpoint = import.meta.env.VITE_CUSTOM_CAKE_API_URL
  if (explicitEndpoint && typeof explicitEndpoint === 'string' && explicitEndpoint.trim() !== '') {
    return explicitEndpoint.trim()
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL
  if (baseUrl && typeof baseUrl === 'string' && baseUrl.trim() !== '') {
    return `${baseUrl.replace(/\/+$/, '')}/custom-cake-requests`
  }

  return null
}

/**
 * Validate a reference image file for type (PNG/JPEG) and size (<= 5 MB).
 */
export function validateReferenceImage(file) {
  if (!file) {
    return { valid: true, error: null }
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a PNG or JPEG image file (.png, .jpg, or .jpeg).',
    }
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1)
    return {
      valid: false,
      error: `Image size (${sizeInMb} MB) exceeds the 5 MB maximum upload limit. Please choose a smaller image.`,
    }
  }

  return { valid: true, error: null }
}

/**
 * Build a multipart FormData payload ready for the Laravel API.
 */
export function buildCustomCakeFormData(formValues) {
  const formData = new FormData()

  // Step 1: Event Details
  formData.append('occasion', formValues.occasion || '')
  formData.append('event_date', formValues.eventDate || '')
  formData.append('event_location', formValues.eventLocation || '')
  formData.append('servings', formValues.servings || '')
  formData.append('budget_range', formValues.budgetRange || '')

  // Step 2: Cake Preferences
  formData.append('flavour', formValues.flavour || '')
  formData.append('cake_style', formValues.cakeStyle || '')
  formData.append('tiers', formValues.tiers || '')
  formData.append('colour_palette', formValues.colourPalette || '')
  formData.append('dietary_requirements', formValues.dietaryRequirements || '')
  formData.append('design_notes', formValues.designNotes || '')

  // Step 3: Design Inspiration
  formData.append('inspiration_notes', formValues.inspirationNotes || '')
  if (formValues.referenceImage instanceof File) {
    formData.append('reference_image', formValues.referenceImage)
  }

  // Step 4: Contact & Delivery
  formData.append('full_name', formValues.fullName || '')
  formData.append('email', formValues.email || '')
  formData.append('phone', formValues.phone || '')
  formData.append('fulfilment_method', formValues.fulfilmentMethod || '')
  if (formValues.fulfilmentMethod === 'delivery') {
    formData.append('delivery_address', formValues.deliveryAddress || '')
  }
  formData.append('additional_instructions', formValues.additionalInstructions || '')
  formData.append('acknowledged_review_policy', formValues.acknowledgePolicy ? '1' : '0')

  return formData
}

/**
 * Submit a custom cake consultation request.
 *
 * @param {Object} formValues - Validated form state across Steps 1–4
 * @returns {Promise<{
 *   mode: 'api' | 'preview',
 *   referenceNumber: string | null,
 *   submittedAt: string,
 *   summary: Object
 * }>}
 */
export async function submitCustomCakeRequest(formValues) {
  if (formValues.referenceImage) {
    const imageCheck = validateReferenceImage(formValues.referenceImage)
    if (!imageCheck.valid) {
      throw new Error(imageCheck.error)
    }
  }

  const endpoint = getCustomCakeApiEndpoint()
  const formData = buildCustomCakeFormData(formValues)

  // If a backend API endpoint is configured, perform a real HTTP POST request
  if (endpoint) {
    let response
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
    } catch {
      throw new Error(
        'Unable to reach the server. Please check your internet connection and try submitting your request again.'
      )
    }

    let responseData = null
    try {
      responseData = await response.json()
    } catch {
      responseData = null
    }

    if (!response.ok) {
      // Handle Laravel 422 validation errors or general API error messages
      if (response.status === 422 && responseData?.errors) {
        const firstFieldErrors = Object.values(responseData.errors).flat()
        const detailMessage =
          firstFieldErrors[0] || responseData.message || 'Please check the highlighted form fields.'
        const error = new Error(detailMessage)
        error.validationErrors = responseData.errors
        throw error
      }

      throw new Error(
        responseData?.message ||
          `Request submission failed (HTTP ${response.status}). Please try again or contact our atelier directly.`
      )
    }

    return {
      mode: 'api',
      referenceNumber:
        responseData?.reference_number ||
        responseData?.data?.reference_number ||
        responseData?.id ||
        null,
      submittedAt: new Date().toISOString(),
      summary: formValues,
    }
  }

  // Frontend Preview Mode (when Laravel backend is not yet connected)
  await new Promise((resolve) => setTimeout(resolve, 850))

  return {
    mode: 'preview',
    referenceNumber: null,
    submittedAt: new Date().toISOString(),
    summary: formValues,
  }
}

