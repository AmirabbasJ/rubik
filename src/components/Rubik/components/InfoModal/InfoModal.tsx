import { config } from '@/config';
import { CloseIcon, CopyIcon, CubeIcon, GitHubIcon, HeartIcon } from '@/icons';
import { Button } from '@/ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { keyToMoveSideMap } from '../Controls';
import classes from './InfoModal.module.css';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
  const [isHoldingShift, setIsHoldingShift] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    const onShiftDown = (e: KeyboardEvent) => {
      if (e.shiftKey && isOpen) setIsHoldingShift(true);
    };

    const onShiftUp = (e: KeyboardEvent) => {
      if (!e.shiftKey && isOpen) setIsHoldingShift(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', onShiftDown);
      document.addEventListener('keyup', onShiftUp);
    }

    return () => {
      document.removeEventListener('keydown', onShiftDown);
      document.removeEventListener('keyup', onShiftUp);
    };
  }, [isHoldingShift, isOpen]);

  const handleCopyAddress = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(config.walletAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={classes.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={classes.modalContainer}>
        <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
          <button
            className={classes.closeButton}
            onClick={onClose}
            aria-label="Close info modal"
            type="button"
          >
            <CloseIcon width={24} height={24} />
          </button>

          <div className={classes.content}>
            <div className={classes.titleContainer}>
              <img src="/images/logo.png" className={classes.logo} />
              <h1 className={classes.title}>Rubik</h1>
            </div>

            <section className={classes.section}>
              <h2 className={classes.sectionTitle}>Features</h2>
              <ul className={classes.featureList}>
                <div className={classes.featureListItemContainer}>
                  <CubeIcon />
                  <li>Interactive 3D Rubik's Cube</li>
                </div>
                <div className={classes.featureListItemContainer}>
                  <CubeIcon />
                  <li>Color customization for each face</li>
                </div>
                <div className={classes.featureListItemContainer}>
                  <CubeIcon />
                  <li>Automatic solver algorithm</li>
                </div>
                <div className={classes.featureListItemContainer}>
                  <CubeIcon />
                  <li>Move tracking and replay</li>
                </div>
                <div className={classes.featureListItemContainer}>
                  <CubeIcon />
                  <li>Shuffle functionality</li>
                </div>
                <div className={classes.featureListItemContainer}>
                  <CubeIcon />
                  <li>Real-time validation</li>
                </div>
              </ul>
            </section>

            <section className={classes.section}>
              <h2 className={classes.sectionTitle}>Keyboard Controls</h2>
              <div className={classes.controlsList}>
                <div className={classes.controlGroup}>
                  <div className={classes.movesList}>
                    {Object.entries(keyToMoveSideMap).map(([key, side]) => (
                      <div key={key} className={classes.moveItem}>
                        <kbd>{key.toUpperCase()}</kbd>
                        <span>→</span>
                        <span className={classes.sideName}>
                          {side}
                          {isHoldingShift ? "'" : null}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p
                    className={clsx(classes.shiftNote, {
                      [classes.holdingShift]: isHoldingShift,
                    })}
                  >
                    Hold <kbd>Shift</kbd> for reverse rotation
                  </p>
                </div>
              </div>
            </section>

            <section className={classes.section}>
              <h2 className={classes.sectionTitle}>Support</h2>
              <div className={classes.support}>
                <Button className={classes.supportLinkButton}>
                  <a
                    href={config.repoAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    <GitHubIcon width={20} height={20} />
                    GitHub Repository
                  </a>
                </Button>

                <Button
                  onClick={handleCopyAddress}
                  className={clsx(classes.supportLinkButton, {
                    [classes.copied]: copiedAddress,
                  })}
                  title="Copy wallet address"
                >
                  <div className={classes.link}>
                    <CopyIcon width={20} height={20} />
                    <span>
                      {copiedAddress
                        ? 'Copied!'
                        : `Donate: ${config.walletAddress.slice(
                            0,
                            6
                          )}...${config.walletAddress.slice(-4)}`}
                    </span>
                  </div>
                </Button>
              </div>
            </section>

            <div className={classes.footer}>
              <span>Made with</span>
              <HeartIcon
                width={16}
                height={16}
                className={classes.footerIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
