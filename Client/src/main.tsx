import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CartProvider, CategoryProvider, CommentProvider, FavoriteProvider, OrderProvider, ProductProvider, UserProvider } from './store/provider.tsx'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 
      <CategoryProvider>
        <FavoriteProvider>
          <UserProvider>
            <CommentProvider>
              <OrderProvider>
                <CartProvider>
                  <ProductProvider>
                    
                    <App />
                  
                  </ProductProvider>
                </CartProvider>
              </OrderProvider>
            </CommentProvider>
          </UserProvider>
        </FavoriteProvider>
      </CategoryProvider>

)
