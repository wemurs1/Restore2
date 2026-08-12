using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentsService(IConfiguration config, DiscountService discountService)
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket, bool removeDiscount = false)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

        var service = new PaymentIntentService();

        var intent = new PaymentIntent();
        var subTotal = basket.Items.Sum(x => x.Quantity * x.Product.Price);
        var deliveryFee = subTotal > 10000 ? 0 : 500;
        long discount = 0;

        if (basket.Coupon != null)
        {
            discount = await discountService.CalculateDiscountFromAmount(basket.Coupon, subTotal, removeDiscount);
        }

        var totalAmount = subTotal - discount + deliveryFee;

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = totalAmount,
                Currency = "usd",
                PaymentMethodTypes = ["card"]
            };
            intent = await service.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = totalAmount
            };
            await service.UpdateAsync(basket.PaymentIntentId, options);
        }

        return intent;
    }
}
