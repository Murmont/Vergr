import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import { NotificationProvider } from '../context/NotificationContext';
import { UIProvider } from '../context/UIContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Toast from '../components/Toast';

// Auth (original)
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpStep1 from '../screens/auth/SignUpStep1';
import SignUpStep2 from '../screens/auth/SignUpStep2';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
// Auth (new)
import TwoFASetupScreen from '../screens/auth/TwoFASetupScreen';
import TwoFALoginScreen from '../screens/auth/TwoFALoginScreen';
import EmailVerificationScreen from '../screens/auth/EmailVerificationScreen';
import PhoneEntryScreen from '../screens/auth/PhoneEntryScreen';
import PhoneOTPScreen from '../screens/auth/PhoneOTPScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import ResetSuccessScreen from '../screens/auth/ResetSuccessScreen';
import SocialLoginScreen from '../screens/auth/SocialLoginScreen';
import AccountTypeScreen from '../screens/auth/AccountTypeScreen';
import ConnectGamingScreen from '../screens/auth/ConnectGamingScreen';

// Onboarding (original)
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import InterestSelectionScreen from '../screens/onboarding/InterestSelectionScreen';
import ProfileSetupScreen from '../screens/onboarding/ProfileSetupScreen';
import FollowSuggestionsScreen from '../screens/onboarding/FollowSuggestionsScreen';
// Onboarding (new)
import OnboardingCompleteScreen from '../screens/onboarding/OnboardingCompleteScreen';
import ProfileSetupStep2Screen from '../screens/onboarding/ProfileSetupStep2Screen';
import ProfileIdentityScreen from '../screens/onboarding/ProfileIdentityScreen';

// Main tabs
import HomeFeedScreen from '../screens/home/HomeFeedScreen';
import ExploreScreen from '../screens/explore/ExploreScreen';
import ShopScreen from '../screens/shop/ShopScreen';
import SquadsScreen from '../screens/squads/SquadsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Home sub (original)
import EarnCoinsScreen from '../screens/home/EarnCoinsScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import CreatePostScreen from '../screens/home/CreatePostScreen';
import LeaderboardScreen from '../screens/home/LeaderboardScreen';
import PostDetailScreen from '../screens/home/PostDetailScreen';
// Home sub (new)
import CreatePollScreen from '../screens/home/CreatePollScreen';
import TrendingHashtagsScreen from '../screens/home/TrendingHashtagsScreen';

// Profile (original)
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import FollowListScreen from '../screens/profile/FollowListScreen';
import PublicProfileScreen from '../screens/profile/PublicProfileScreen';
// Profile (new)
import BrowseCreatorsScreen from '../screens/profile/BrowseCreatorsScreen';
import EsportsTeamScreen from '../screens/profile/EsportsTeamScreen';
import PrestigeLevelsScreen from '../screens/profile/PrestigeLevelsScreen';

// Messages (original)
import MessagesInboxScreen from '../screens/messages/MessagesInboxScreen';
import ChatThreadScreen from '../screens/messages/ChatThreadScreen';
// Messages (new)
import MessageRequestsScreen from '../screens/messages/MessageRequestsScreen';
import CreateGroupChatScreen from '../screens/messages/CreateGroupChatScreen';
import NewMessageScreen from '../screens/messages/NewMessageScreen';
import ChatSettingsScreen from "../screens/messages/ChatSettingsScreen";

// Squads (original)
import CreateSquadScreen from '../screens/squads/CreateSquadScreen';
import SquadDetailScreen from '../screens/squads/SquadDetailScreen';
// Squads (new)
import SquadSettingsScreen from '../screens/squads/SquadSettingsScreen';
import SquadRolesScreen from '../screens/squads/SquadRolesScreen';
import SquadMembersScreen from '../screens/squads/SquadMembersScreen';
import SquadMediaScreen from '../screens/squads/SquadMediaScreen';
import SquadPinnedScreen from '../screens/squads/SquadPinnedScreen';
import SquadChallengesScreen from '../screens/squads/SquadChallengesScreen';
import SquadEventsScreen from '../screens/squads/SquadEventsScreen';
import SquadJoinRequestsScreen from '../screens/squads/SquadJoinRequestsScreen';
import SquadAnnouncementsScreen from '../screens/squads/SquadAnnouncementsScreen';
import SquadLeaderboardScreen from '../screens/squads/SquadLeaderboardScreen';
import InviteMembersScreen from '../screens/squads/InviteMembersScreen';

// Shop (original)
import WalletScreen from '../screens/shop/WalletScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CheckoutScreen from '../screens/shop/CheckoutScreen';
import OrderTrackingScreen from '../screens/shop/OrderTrackingScreen';
import OrderSuccessScreen from '../screens/shop/OrderSuccessScreen';
// Shop (new)
import BuyCoinsScreen from '../screens/shop/BuyCoinsScreen';
import PaymentMethodScreen from '../screens/shop/PaymentMethodScreen';
import PurchaseSuccessScreen from '../screens/shop/PurchaseSuccessScreen';
import SubmitReviewScreen from '../screens/shop/SubmitReviewScreen';
import TransactionReceiptScreen from '../screens/shop/TransactionReceiptScreen';
import TransactionFiltersScreen from '../screens/shop/TransactionFiltersScreen';
import RequestPayoutScreen from '../screens/shop/RequestPayoutScreen';
import PayoutSuccessScreen from '../screens/shop/PayoutSuccessScreen';
import WalletSecurityScreen from '../screens/shop/WalletSecurityScreen';

// Creator (original)
import CreatorDashboardScreen from '../screens/creator/CreatorDashboardScreen';
import MonthlyAnalyticsScreen from '../screens/creator/MonthlyAnalyticsScreen';
// Creator (new)
import CreatorQuestsScreen from '../screens/creator/CreatorQuestsScreen';
import MembershipTiersScreen from '../screens/creator/MembershipTiersScreen';
import CreatorVerificationScreen from '../screens/creator/CreatorVerificationScreen';
import VerificationPendingScreen from '../screens/creator/VerificationPendingScreen';

// Streams (original)
import GoLiveSetupScreen from '../screens/streams/GoLiveSetupScreen';
import LiveStreamScreen from '../screens/streams/LiveStreamScreen';
// Streams (new)
import StreamAnalyticsScreen from '../screens/streams/StreamAnalyticsScreen';
// StreamChatOverlay is now a component in src/components/stream/
import StreamEndingScreen from '../screens/streams/StreamEndingScreen';
import StreamModerationScreen from '../screens/streams/StreamModerationScreen';
import CoStreamingScreen from '../screens/streams/CoStreamingScreen';

// Tournaments (original)
import TournamentScreen from '../screens/tournaments/TournamentScreen';
// Tournaments (new)
import TournamentStandingsScreen from '../screens/tournaments/TournamentStandingsScreen';
import TournamentPrizePoolScreen from '../screens/tournaments/TournamentPrizePoolScreen';
import MatchDetailsScreen from '../screens/tournaments/MatchDetailsScreen';

// Settings (original)
import SettingsScreen from '../screens/settings/SettingsScreen';
import PrivacySettingsScreen from '../screens/settings/PrivacySettingsScreen';
import LinkedAccountsScreen from '../screens/settings/LinkedAccountsScreen';
import NotificationSettingsScreen from '../screens/settings/NotificationSettingsScreen';
import AboutScreen from '../screens/settings/AboutScreen';
// Settings (new)
import SecuritySettingsScreen from '../screens/settings/SecuritySettingsScreen';
import LanguageSettingsScreen from '../screens/settings/LanguageSettingsScreen';
import DisplaySettingsScreen from '../screens/settings/DisplaySettingsScreen';
import AppPermissionsScreen from '../screens/settings/AppPermissionsScreen';
import BlockedWordsScreen from '../screens/settings/BlockedWordsScreen';
import BlockedUsersScreen from '../screens/settings/BlockedUsersScreen';
import AccountDataExportScreen from '../screens/settings/AccountDataExportScreen';
import AccountDeletionScreen from '../screens/settings/AccountDeletionScreen';
import DisconnectAccountScreen from '../screens/settings/DisconnectAccountScreen';
import HelpCenterScreen from '../screens/settings/HelpCenterScreen';
import PrivacyPolicyScreen from '../screens/settings/PrivacyPolicyScreen';

// Brand (new)
import AddProductScreen from '../screens/brand/AddProductScreen';
import InventoryScreen from '../screens/brand/InventoryScreen';
import SalesAnalyticsScreen from '../screens/brand/SalesAnalyticsScreen';

// Search (new)
import SearchResultsAllScreen from '../screens/search/SearchResultsAllScreen';
import SearchResultsStreamsScreen from '../screens/search/SearchResultsStreamsScreen';
import NoSearchResultsScreen from '../screens/search/NoSearchResultsScreen';

// Utility (new)
import MaintenanceScreen from '../screens/utility/MaintenanceScreen';
import ForceUpdateScreen from '../screens/utility/ForceUpdateScreen';
import NetworkErrorScreen from '../screens/utility/NetworkErrorScreen';
import ActivityLogScreen from '../screens/utility/ActivityLogScreen';

// Tournaments (final batch)
import TeamManagementScreen from '../screens/tournaments/TeamManagementScreen';
import TeamFundingScreen from '../screens/tournaments/TeamFundingScreen';
import ContributeScreen from '../screens/tournaments/ContributeScreen';
import ContributionSuccessScreen from '../screens/tournaments/ContributionSuccessScreen';
import PrizeReceiptScreen from '../screens/tournaments/PrizeReceiptScreen';

// Home (final)
const P = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <NotificationProvider>
            <UIProvider>
              <Toast />
              <Routes>
                {/* Public / Auth */}
                <Route path="/splash" element={<SplashScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/social-login" element={<SocialLoginScreen />} />
                <Route path="/signup" element={<SignUpStep1 />} />
                <Route path="/signup/step2" element={<SignUpStep2 />} />
                <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
                <Route path="/new-password" element={<NewPasswordScreen />} />
                <Route path="/reset-success" element={<ResetSuccessScreen />} />
                <Route path="/verify-email" element={<EmailVerificationScreen />} />
                <Route path="/verify-phone" element={<PhoneEntryScreen />} />
                <Route path="/verify-otp" element={<PhoneOTPScreen />} />
                <Route path="/2fa-setup" element={<TwoFASetupScreen />} />
                <Route path="/2fa-verify" element={<TwoFALoginScreen />} />
                <Route path="/account-type" element={<AccountTypeScreen />} />
                <Route path="/connect-gaming" element={<ConnectGamingScreen />} />

                {/* Onboarding */}
                <Route path="/onboarding/welcome" element={<OnboardingScreen />} />
                <Route path="/setup/identity" element={<ProfileIdentityScreen />} />
                <Route path="/setup/interests" element={<InterestSelectionScreen />} />
                <Route path="/setup/profile" element={<ProfileSetupScreen />} />
                <Route path="/setup/profile-2" element={<ProfileSetupStep2Screen />} />
                <Route path="/setup/follow-suggestions" element={<FollowSuggestionsScreen />} />
                <Route path="/setup/complete" element={<OnboardingCompleteScreen />} />

                {/* Main tabs */}
                <Route path="/" element={<P><HomeFeedScreen /></P>} />
                <Route path="/explore" element={<P><ExploreScreen /></P>} />
                <Route path="/shop" element={<P><ShopScreen /></P>} />
                <Route path="/squads" element={<P><SquadsScreen /></P>} />
                <Route path="/profile" element={<P><ProfileScreen /></P>} />

                {/* Home sub */}
                <Route path="/earn" element={<P><EarnCoinsScreen /></P>} />
                <Route path="/notifications" element={<P><NotificationsScreen /></P>} />
                <Route path="/create-post" element={<P><CreatePostScreen /></P>} />
                <Route path="/create-poll" element={<P><CreatePollScreen /></P>} />
                <Route path="/leaderboard" element={<P><LeaderboardScreen /></P>} />
                <Route path="/post/:postId" element={<P><PostDetailScreen /></P>} />
                <Route path="/trending" element={<P><TrendingHashtagsScreen /></P>} />

                {/* Search */}
                <Route path="/search" element={<P><SearchResultsAllScreen /></P>} />
                <Route path="/search/streams" element={<P><SearchResultsStreamsScreen /></P>} />
                <Route path="/search/empty" element={<P><NoSearchResultsScreen /></P>} />

                {/* Profile */}
                <Route path="/edit-profile" element={<P><EditProfileScreen /></P>} />
                <Route path="/followers/:tab" element={<P><FollowListScreen /></P>} />
                <Route path="/user/:username" element={<P><PublicProfileScreen /></P>} />
                <Route path="/browse-creators" element={<P><BrowseCreatorsScreen /></P>} />
                <Route path="/esports-team/:teamId" element={<P><EsportsTeamScreen /></P>} />
                <Route path="/prestige" element={<P><PrestigeLevelsScreen /></P>} />

                {/* Messages */}
                <Route path="/messages" element={<P><MessagesInboxScreen /></P>} />
                <Route path="/messages/new" element={<P><NewMessageScreen /></P>} />
                <Route path="/messages/requests" element={<P><MessageRequestsScreen /></P>} />
                <Route path="/messages/create-group" element={<P><CreateGroupChatScreen /></P>} />
                <Route path="/messages/:chatId" element={<P><ChatThreadScreen /></P>} />
                <Route path="/messages/:chatId/settings" element={<P><ChatSettingsScreen /></P>} />

                {/* Squads */}
                <Route path="/squads/create" element={<P><CreateSquadScreen /></P>} />
                <Route path="/squads/:squadId" element={<P><SquadDetailScreen /></P>} />
                <Route path="/squads/:squadId/settings" element={<P><SquadSettingsScreen /></P>} />
                <Route path="/squads/:squadId/roles" element={<P><SquadRolesScreen /></P>} />
                <Route path="/squads/:squadId/members" element={<P><SquadMembersScreen /></P>} />
                <Route path="/squads/:squadId/media" element={<P><SquadMediaScreen /></P>} />
                <Route path="/squads/:squadId/pinned" element={<P><SquadPinnedScreen /></P>} />
                <Route path="/squads/:squadId/challenges" element={<P><SquadChallengesScreen /></P>} />
                <Route path="/squads/:squadId/events" element={<P><SquadEventsScreen /></P>} />
                <Route path="/squads/:squadId/requests" element={<P><SquadJoinRequestsScreen /></P>} />
                <Route path="/squads/:squadId/announcements" element={<P><SquadAnnouncementsScreen /></P>} />
                <Route path="/squads/:squadId/leaderboard" element={<P><SquadLeaderboardScreen /></P>} />
                <Route path="/squads/:squadId/invite" element={<P><InviteMembersScreen /></P>} />

                {/* Shop & Wallet */}
                <Route path="/wallet" element={<P><WalletScreen /></P>} />
                <Route path="/wallet/security" element={<P><WalletSecurityScreen /></P>} />
                <Route path="/buy-coins" element={<P><BuyCoinsScreen /></P>} />
                <Route path="/payment-method" element={<P><PaymentMethodScreen /></P>} />
                <Route path="/purchase-success" element={<P><PurchaseSuccessScreen /></P>} />
                <Route path="/product/:productId" element={<P><ProductDetailScreen /></P>} />
                <Route path="/product/:productId/review" element={<P><SubmitReviewScreen /></P>} />
                <Route path="/checkout" element={<P><CheckoutScreen /></P>} />
                <Route path="/order-tracking" element={<P><OrderTrackingScreen /></P>} />
                <Route path="/order-success" element={<P><OrderSuccessScreen /></P>} />
                <Route path="/transaction/:txId" element={<P><TransactionReceiptScreen /></P>} />
                <Route path="/transactions/filter" element={<P><TransactionFiltersScreen /></P>} />
                <Route path="/request-payout" element={<P><RequestPayoutScreen /></P>} />
                <Route path="/payout-success" element={<P><PayoutSuccessScreen /></P>} />

                {/* Brand */}
                <Route path="/brand/add-product" element={<P><AddProductScreen /></P>} />
                <Route path="/brand/inventory" element={<P><InventoryScreen /></P>} />
                <Route path="/brand/sales" element={<P><SalesAnalyticsScreen /></P>} />

                {/* Creator */}
                <Route path="/creator/dashboard" element={<P><CreatorDashboardScreen /></P>} />
                <Route path="/creator/analytics" element={<P><MonthlyAnalyticsScreen /></P>} />
                <Route path="/creator/quests" element={<P><CreatorQuestsScreen /></P>} />
                <Route path="/creator/membership" element={<P><MembershipTiersScreen /></P>} />
                <Route path="/creator/verify" element={<P><CreatorVerificationScreen /></P>} />
                <Route path="/verification-pending" element={<P><VerificationPendingScreen /></P>} />

                {/* Streams */}
                <Route path="/go-live" element={<P><GoLiveSetupScreen /></P>} />
                <Route path="/go-live/co-stream" element={<P><CoStreamingScreen /></P>} />
                <Route path="/stream/:streamId" element={<P><LiveStreamScreen /></P>} />
                <Route path="/stream/:streamId/moderation" element={<P><StreamModerationScreen /></P>} />
                <Route path="/stream/analytics" element={<P><StreamAnalyticsScreen /></P>} />
                <Route path="/stream/ended" element={<P><StreamEndingScreen /></P>} />

                {/* Tournaments */}
                <Route path="/tournaments" element={<P><TournamentScreen /></P>} />
                <Route path="/tournaments/standings" element={<P><TournamentStandingsScreen /></P>} />
                <Route path="/tournaments/prizes" element={<P><TournamentPrizePoolScreen /></P>} />
                <Route path="/match/:matchId" element={<P><MatchDetailsScreen /></P>} />

                {/* Settings */}
                <Route path="/settings" element={<P><SettingsScreen /></P>} />
                <Route path="/settings/privacy" element={<P><PrivacySettingsScreen /></P>} />
                <Route path="/settings/security" element={<P><SecuritySettingsScreen /></P>} />
                <Route path="/settings/linked-accounts" element={<P><LinkedAccountsScreen /></P>} />
                <Route path="/settings/notifications" element={<P><NotificationSettingsScreen /></P>} />
                <Route path="/settings/language" element={<P><LanguageSettingsScreen /></P>} />
                <Route path="/settings/display" element={<P><DisplaySettingsScreen /></P>} />
                <Route path="/settings/permissions" element={<P><AppPermissionsScreen /></P>} />
                <Route path="/settings/blocked-words" element={<P><BlockedWordsScreen /></P>} />
                <Route path="/settings/blocked-users" element={<P><BlockedUsersScreen /></P>} />
                <Route path="/settings/export-data" element={<P><AccountDataExportScreen /></P>} />
                <Route path="/settings/delete-account" element={<P><AccountDeletionScreen /></P>} />
                <Route path="/settings/disconnect/:platform" element={<P><DisconnectAccountScreen /></P>} />
                <Route path="/settings/help" element={<P><HelpCenterScreen /></P>} />
                <Route path="/settings/privacy-policy" element={<P><PrivacyPolicyScreen /></P>} />
                <Route path="/settings/about" element={<P><AboutScreen /></P>} />
                <Route path="/activity" element={<P><ActivityLogScreen /></P>} />

                {/* Utility */}
                <Route path="/maintenance" element={<MaintenanceScreen />} />
                <Route path="/update-required" element={<ForceUpdateScreen />} />
                <Route path="/offline" element={<NetworkErrorScreen />} />

                <Route path="/team/:teamId/manage" element={<P><TeamManagementScreen /></P>} />
                <Route path="/team/:teamId/funding" element={<P><TeamFundingScreen /></P>} />
                <Route path="/team-contribute" element={<P><ContributeScreen /></P>} />
                <Route path="/contribution-success" element={<P><ContributionSuccessScreen /></P>} />
                <Route path="/prize-receipt/:prizeId" element={<P><PrizeReceiptScreen /></P>} />
                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </UIProvider>
          </NotificationProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
