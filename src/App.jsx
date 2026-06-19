import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import TrackingPage from './pages/TrackingPage'
import LoadingPage from './components/common/LoadingPage'
import { useAuthStore } from './store/useAuthStore'
import { useTrackingStore } from './store/useTrackingStore'
import { initIframeMessaging } from './utils/iframeInit'

function App() {
	const fetchToken = useAuthStore((state) => state.fetchToken)
	const authLoading = useAuthStore((state) => state.isLoading)

	const { isLoading, data, error, searchId, fetchTracking, reset } = useTrackingStore()

	useEffect(() => {
		fetchToken()
		initIframeMessaging(fetchTracking, reset)
	}, [fetchToken])

	if (authLoading) {
		return <Layout><LoadingPage /></Layout>
	}

	const showTracking = Boolean(data || error)

	return (
		<Layout>
			{isLoading ? (
				<LoadingPage searchId={searchId} />
			) : showTracking ? (
				<TrackingPage onBack={reset} />
			) : (
				<HomePage />
			)}
		</Layout>
	)
}

export default App
