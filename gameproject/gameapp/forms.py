from django import forms
from gameapp.models import CustomerFeedback,Customer

class NewCustomerFeedback(forms.ModelForm):
    class Meta():
        model=CustomerFeedback
        fields='__all__'

class NewCustomersForm(forms.ModelForm):
    class Meta():
        model=Customer
        fields='__all__'
