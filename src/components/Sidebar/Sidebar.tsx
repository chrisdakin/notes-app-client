import { useIsMobile } from '../../hooks';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';

export function Sidebar() {
	const isMobile = useIsMobile();

	return isMobile ? <MobileSidebar /> : <DesktopSidebar />;
}
