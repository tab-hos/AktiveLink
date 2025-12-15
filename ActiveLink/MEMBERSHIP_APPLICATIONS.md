# Membership Applications Storage

## Where Applications Go

When someone submits a membership application through the form on the `/join` page, the application is stored in the browser's **localStorage** with the key `activelink_membership_applications`.

## Current Implementation

### Storage Location
- **Browser localStorage** (client-side)
- **Storage Key**: `activelink_membership_applications`
- **Format**: JSON array of application objects

### Application Data Structure
Each application includes:
```json
{
  "id": "timestamp",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+358 40 1234567",
  "membership_type": "individual",
  "membership_fee": 30,
  "message": "Why they want to join...",
  "submitted_at": "2024-12-10T00:00:00.000Z",
  "status": "pending"
}
```

### Accessing Applications

#### In Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run:
```javascript
JSON.parse(localStorage.getItem('activelink_membership_applications') || '[]')
```

#### Programmatically
The `MembershipForm.jsx` component exports a helper function:
```javascript
import { getMembershipApplications } from './Components/join/MembershipForm.jsx';

const applications = getMembershipApplications();
console.log(applications);
```

## Membership Fees

The application automatically calculates and displays the membership fee based on the selected type:

- **Student**: €15/year
- **Individual**: €30/year
- **Family**: €50/year
- **Corporate**: €200/year

The fee is:
- Displayed in the form as the user selects membership type
- Saved with the application data
- Shown in the success message

## Next Steps for Production

### Backend Integration
Replace the localStorage implementation with an API call:

1. Update `Components/join/MembershipForm.jsx` line 69-70:
```javascript
// Replace this:
// await new Promise(resolve => setTimeout(resolve, 500));

// With this:
await fetch('/api/membership-applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(application)
});
```

2. Create backend endpoint to:
   - Store applications in a database
   - Send confirmation emails
   - Handle payment processing
   - Provide admin dashboard to view/manage applications

### Email Notifications
- Send confirmation email to applicant
- Send notification to admin team
- Include payment instructions after approval

### Payment Integration
- Integrate payment gateway (Stripe, PayPal, etc.)
- Process payments after application approval
- Update application status based on payment

## Testing

To test the application storage:
1. Fill out the membership form
2. Submit the application
3. Open browser console
4. Check localStorage for saved data
5. Verify the application appears in the array

