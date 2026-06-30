import Spinner from '../ui/Spinner'

const LoadingPage = ({ searchId }) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
			<div className="relative flex items-center justify-center mb-8">
				<div className="absolute w-24 h-24 rounded-full bg-primary/10 animate-ping" />
				<div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
					<Spinner size="lg" />
				</div>
			</div>

			<p className="text-lg font-semibold text-secondary-dark mb-2">
				Consultando información...
			</p>

			{searchId && (
				<p className="text-sm text-secondary/70 font-mono bg-gray-50 px-3 py-1 rounded-lg border">
					{searchId}
				</p>
			)}

			<div className="mt-8 flex gap-1.5">
				{[0, 1, 2].map((i) => (
					<span
						key={i}
						className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
						style={{ animationDelay: `${i * 0.15}s` }}
					/>
				))}
			</div>
		</div>
	)
}

export default LoadingPage
