import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {
	const [enabled, setEnabled] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const mouseMoveEvent = (event) => {
			const { x, y } = event;
			setPosition({ x, y });
		};

		if (enabled) {
			window.addEventListener('pointermove', mouseMoveEvent);
		}

		return () => {
			window.removeEventListener('pointermove', mouseMoveEvent);
		};
	}, [enabled]);

	useEffect(() => {
		enabled
			? (document.body.style = 'cursor: none')
			: (document.body.style = 'cursor: initial');
	}, [enabled]);

	return (
		<>
			<div
				style={{
					display: `${enabled ? 'initial' : 'none'}`,
					position: 'absolute',
					background: '#09f',
					borderRadius: '50%',
					opacity: 0.8,
					pointerEvents: 'none',
					left: -20,
					top: -20,
					width: 40,
					height: 40,
					transform: `translate(${position.x}px, ${position.y}px)`,
				}}
			/>
			<button
				onClick={() => {
					setEnabled(!enabled);
				}}
			>
				{enabled ? 'Desactivar' : 'Activar'} seguir puntero
			</button>
		</>
	);
}

export default App;
