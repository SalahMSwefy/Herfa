import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <App />
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerClassName="mt-2"
                    toastOptions={{
                        success: {
                            duration: 3000,
                            className:
                                'bg-green-100 text-green-800 font-medium px-4 py-3 rounded-xl shadow-md',
                        },
                        error: {
                            duration: 5000,
                            className:
                                'bg-red-100 text-red-800 font-medium px-4 py-3 rounded-xl shadow-md',
                        },
                        className:
                            'text-base max-w-md px-6 py-4 bg-white text-gray-700 rounded-lg shadow-md',
                    }}
                />
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>,
)
