import {
  initConnection,
  purchaseUpdatedListener,
  purchaseErrorListener,
  finishTransaction,
  getProducts,
  requestPurchase,
  Purchase,
  ProductPurchase,
  PurchaseError,
} from 'react-native-iap';
import {IAP_PRODUCTS} from '@/constants';
import {useSettingsStore} from '@/store';

class IAPService {
  private purchaseUpdateSubscription: any;
  private purchaseErrorSubscription: any;

  async initialize() {
    try {
      await initConnection();
      console.log('IAP connection initialized');

      this.purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase: Purchase) => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            await this.handlePurchase(purchase);
          }
        },
      );

      this.purchaseErrorSubscription = purchaseErrorListener(
        (error: PurchaseError) => {
          console.warn('Purchase error:', error);
        },
      );

      return true;
    } catch (error) {
      console.error('IAP initialization failed:', error);
      return false;
    }
  }

  async loadProducts() {
    try {
      const productIds = Object.values(IAP_PRODUCTS);
      const products = await getProducts({skus: productIds});
      return products;
    } catch (error) {
      console.error('Failed to load products:', error);
      return [];
    }
  }

  async purchaseProduct(productId: string) {
    try {
      await requestPurchase({sku: productId});
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  }

  private async handlePurchase(purchase: Purchase) {
    try {
      // Verify purchase with your backend here (if you had one)
      // For offline app, we trust the App Store receipt

      // Unlock features based on product
      const {productId} = purchase;

      if (productId === IAP_PRODUCTS.PRO_UNLOCK) {
        useSettingsStore.getState().setPro(true);
      }

      // Finish the transaction
      await finishTransaction({purchase, isConsumable: false});

      console.log('Purchase completed:', productId);
    } catch (error) {
      console.error('Failed to handle purchase:', error);
    }
  }

  async restorePurchases() {
    try {
      // Note: react-native-iap v12+ uses different restore method
      // This is a simplified version
      console.log('Restore purchases initiated');
      // Implementation depends on your specific needs
    } catch (error) {
      console.error('Restore failed:', error);
    }
  }

  dispose() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
    }
  }
}

export const iapService = new IAPService();
