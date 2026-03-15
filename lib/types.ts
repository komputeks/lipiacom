export interface LipiaSTKRequest {
  phone_number: string
  amount: number
  external_reference?: string
  callback_url?: string
  metadata?: Record<string, any>
}

export interface LipiaSTKResponse {
  success: boolean
  status: string
  message: string
  customerMessage: string
  data: {
    TransactionReference: string
    ResponseCode: number
    ResponseDescription: string
  }
  timestamp: string
}

export interface LipiaStatusResponse {
  success: boolean
  status: string
  message: string
  customerMessage: string
  data: {
    response: {
      Amount: number
      ExternalReference: string
      MpesaReceiptNumber: string
      Phone: string
      ResultCode: number
      ResultDesc: string
      Status: "PENDING" | "SUCCESS" | "FAILED"
      TransactionDate: string
    }
    status: boolean
  }
}